/// <amd-module name="Data/_type/Model" />
/**
 * Абстрактная модель.
 * Модели обеспечивают доступ к данным и поведению объектов предметной области (сущностям).
 * Такими сущностями могут быть, например, товары, пользователи, документы - и другие предметы окружающего мира, которые вы моделируете в своем приложении.
 *
 * В основе абстрактной модели лежит {@link WS.Data/Entity/Record запись}.
 * Основные аспекты модели (дополнительно к аспектам записи):
 * <ul>
 *    <li>определение {@link properties собственных свойств} сущности;</li>
 *    <li>{@link getId уникальный идентификатор сущности} среди ей подобных.</li>
 * </ul>
 *
 * Поведенческие аспекты каждой сущности реализуются ее прикладным модулем в виде публичных методов.
 * Прикладные модели могут внедряться в порождающие их объекты, такие как {@link WS.Data/Source/ISource#model источники данных} или {@link WS.Data/Collection/RecordSet#model рекордсеты}.
 *
 * Для реализации конкретной модели используется наследование от абстрактной либо промежуточной.
 *
 * Для корректной сериализации и клонирования моделей необходимо выносить их в отдельные модули и указывать имя модуля в свойстве _moduleName каждого наследника:
 * <pre>
 * define('My.Awesome.Model', ['WS.Data/Entity/Model'], function (Model) {
 *    'use strict';
 *
 *    var AwesomeModel = Model.extend({
 *      _moduleName: 'My.Awesome.Model'
 *      //...
 *    });
 *
 *    return AwesomeModel;
 * });
 * </pre>
 *
 * Определим модель пользователя:
 * <pre>
 *    define('Application/Model/User', ['WS.Data/Entity/Model', 'Application/Lib/Salt'], function (Model, Salt) {
 *       var User = Model.extend({
 *          _moduleName: 'Application/Model/User'
 *          _$format: [
 *             {name: 'login', type: 'string'},
 *             {name: 'salt', type: 'string'}
 *          ],
 *          _$idProperty: 'login',
 *          authenticate: function(password) {
 *             return Salt.encode(this.get('login') + ':' + password) === this.get('salt');
 *          }
 *       });
 *
 *       return User;
 *    });
 * </pre>
 * Создадим модель пользователя:
 * <pre>
 *    define('Application/Controller/Test/Auth', ['Application/Model/User'], function (User) {
 *       var user = new User();
 *       user.set({
 *          login: 'i.c.wiener',
 *          salt: 'grhS2Nys345fsSW3mL9'
 *       });
 *       var testOk = user.authenticate('its pizza time!');
 *    });
 * </pre>
 *
 * Модели могут объединяться по принципу "матрёшки" - сырыми данными одной модели является другая модель. Для организации такой структуры следует использовать {@link WS.Data/Adapter/RecordSet адаптер рекордсета}:
 * <pre>
 *    var MyEngine, MyTransmission, myCar;
 *
 *    MyEngine = Model.extend({
 *       _$properties: {
 *          fuelType: {
 *             get: function() {
 *                return 'Diesel';
 *             }
 *          }
 *       }
 *    });
 *
 *    MyTransmission = Model.extend({
 *       _$properties: {
 *          transmissionType: {
 *             get: function() {
 *                return 'Manual';
 *             }
 *          }
 *       }
 *    });
 *
 *    myCar = new MyEngine({
 *       rawData: new MyTransmission({
 *          rawData: {
 *             color: 'Red',
 *             fuelType: '',
 *             transmissionType: ''
 *          }
 *       }),
 *       adapter: new RecordSetAdapter()
 *   });
 *
 *   myCar.get('fuelType');//'Diesel'
 *   myCar.get('transmissionType');//'Manual'
 *   myCar.get('color');//'Red'
 * </pre>
 * @class WS.Data/Entity/Model
 * @extends WS.Data/Entity/Record
 * @implements WS.Data/Entity/IInstantiable
 * @mixes WS.Data/Entity/InstantiableMixin
 * @public
 * @ignoreMethods getDefault
 * @author Мальцев А.А.
 */
define('Data/_type/Model', [
    'require',
    'exports',
    'tslib',
    'Data/_type/Record',
    'Data/_type/InstantiableMixin',
    'Data/_type/functor',
    'Data/util',
    'Data/shim'
], function (require, exports, tslib_1, Record_1, InstantiableMixin_1, functor_1, util_1, shim_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * Separator for path in object
     */
    /**
     * Separator for path in object
     */
    var ROUTE_SEPEARTOR = '.';
    var Model = /** @class */
    function (_super) {
        tslib_1.__extends(Model, _super);
        function Model(options) {
            var _this = _super.call(this, options) || this;    //TODO: don't allow to inject properties through constructor
            //TODO: don't allow to inject properties through constructor
            _this._propertiesInjected = options && 'properties' in options;
            if (!_this._$idProperty) {
                _this._$idProperty = _this._getAdapter().getKeyField(_this._getRawData()) || '';
            }
            return _this;
        }
        Model.prototype.destroy = function () {
            this._defaultPropertiesValues = null;
            this._propertiesDependency = null;
            this._nowCalculatingProperties = null;
            _super.prototype.destroy.call(this);
        };    // region IObject
        // region IObject
        Model.prototype.get = function (name) {
            this._pushDependency(name);
            if (this._fieldsCache.has(name)) {
                return this._fieldsCache.get(name);
            }
            var property = this._$properties && this._$properties[name];
            var superValue = _super.prototype.get.call(this, name);
            if (!property) {
                return superValue;
            }
            var preValue = superValue;
            if ('def' in property && !this._getRawDataAdapter().has(name)) {
                preValue = this.getDefault(name);
            }
            if (!property.get) {
                return preValue;
            }
            var value = this._processCalculatedValue(name, preValue, property, true);
            if (value !== superValue) {
                this._removeChild(superValue);
                this._addChild(value, this._getRelationNameForField(name));
            }
            if (this._isFieldValueCacheable(value)) {
                this._fieldsCache.set(name, value);
            } else if (this._fieldsCache.has(name)) {
                this._fieldsCache.delete(name);
            }
            return value;
        };
        Model.prototype.set = function (name, value) {
            var _this = this;
            if (!this._$properties) {
                _super.prototype.set.call(this, name, value);
                return;
            }
            var map = this._getHashMap(name, value);
            var pairs = [];
            var errors = [];
            Object.keys(map).forEach(function (key) {
                _this._deleteDependencyCache(key);    //Try to set every property
                //Try to set every property
                var value = map[key];
                try {
                    var property = _this._$properties && _this._$properties[key];
                    if (property) {
                        if (property.set) {
                            if (_this._fieldsCache.has(key)) {
                                _this._removeChild(_this._fieldsCache.get(key));
                                _this._fieldsCache.delete(key);
                            }
                            value = _this._processCalculatedValue(key, value, property, false);
                            if (value === undefined) {
                                return;
                            }
                        } else if (property.get) {
                            errors.push(new ReferenceError('Property "' + key + '" is read only'));
                            return;
                        }
                    }
                    pairs.push([
                        key,
                        value,
                        Record_1.default.prototype.get.call(_this, key)
                    ]);
                } catch (err) {
                    //Collecting errors for every property
                    errors.push(err);
                }
            });
            var superErrors = [];
            var superChanged = _super.prototype._setPairs.call(this, pairs, superErrors);
            if (superChanged) {
                var changed = Object.keys(superChanged).reduce(function (memo, key) {
                    memo[key] = map[key];
                    return memo;
                }, {});
                this._notifyChange(changed);
            }
            this._checkErrors(errors);
            this._checkErrors(superErrors);
        };
        Model.prototype.has = function (name) {
            return this._$properties && this._$properties.hasOwnProperty(name) || _super.prototype.has.call(this, name);
        };    // endregion
              // region IEnumerable
              /**
         * Возвращает энумератор для перебора названий свойств модели
         * @return {WS.Data/Collection/ArrayEnumerator}
         * @example
         * Смотри пример {@link WS.Data/Entity/Record#getEnumerator для записи}:
         */
        // endregion
        // region IEnumerable
        /**
         * Возвращает энумератор для перебора названий свойств модели
         * @return {WS.Data/Collection/ArrayEnumerator}
         * @example
         * Смотри пример {@link WS.Data/Entity/Record#getEnumerator для записи}:
         */
        Model.prototype.getEnumerator = function () {
            var ArrayEnumerator = util_1.di.resolve('Data/collection:ArrayEnumerator');
            return new ArrayEnumerator(this._getAllProperties());
        };    /**
         * Перебирает все свойства модели (включая имеющиеся в "сырых" данных)
         * @param {Function(String, *)} callback Ф-я обратного вызова для каждого свойства. Первым аргументом придет название свойства, вторым - его значение.
         * @param {Object} [context] Контекст вызова callback.
         * @example
         * Смотри пример {@link WS.Data/Entity/Record#each для записи}:
         */
        /**
         * Перебирает все свойства модели (включая имеющиеся в "сырых" данных)
         * @param {Function(String, *)} callback Ф-я обратного вызова для каждого свойства. Первым аргументом придет название свойства, вторым - его значение.
         * @param {Object} [context] Контекст вызова callback.
         * @example
         * Смотри пример {@link WS.Data/Entity/Record#each для записи}:
         */
        Model.prototype.each = function (callback, context) {
            return _super.prototype.each.call(this, callback, context);
        };    // endregion
              // region IReceiver
        // endregion
        // region IReceiver
        Model.prototype.relationChanged = function (which, route) {
            var _this = this;    // Delete cache for properties related of changed one use in-deep route
            // Delete cache for properties related of changed one use in-deep route
            var curr = [];
            var routeLastIndex = route.length - 1;
            route.forEach(function (name, index) {
                var fieldName = _this._getFieldFromRelationName(name);
                curr.push(fieldName);
                if (fieldName) {
                    _this._deleteDependencyCache(curr.join(ROUTE_SEPEARTOR));
                    if (index === routeLastIndex && which.data instanceof Object) {
                        Object.keys(which.data).forEach(function (key) {
                            _this._deleteDependencyCache(curr.concat([key]).join(ROUTE_SEPEARTOR));
                        });
                    }
                }
            });
            return _super.prototype.relationChanged.call(this, which, route);
        };    // endregion
              // region SerializableMixin
        // endregion
        // region SerializableMixin
        Model.prototype._getSerializableState = function (state) {
            state = _super.prototype._getSerializableState.call(this, state);    //Properties are owned by class, not by instance
            //Properties are owned by class, not by instance
            if (!this._propertiesInjected) {
                delete state.$options.properties;
            }
            state._instanceId = this.getInstanceId();
            state._isDeleted = this._isDeleted;
            if (this._defaultPropertiesValues) {
                state._defaultPropertiesValues = this._defaultPropertiesValues;
            }
            return state;
        };
        Model.prototype._setSerializableState = function (state) {
            var fromSuper = _super.prototype._setSerializableState.call(this, state);
            return function () {
                fromSuper.call(this);
                this._instanceId = state._instanceId;
                this._isDeleted = state._isDeleted;
                if (state._defaultPropertiesValues) {
                    this._defaultPropertiesValues = state._defaultPropertiesValues;
                }
            };
        };    // endregion
              // region Record
        // endregion
        // region Record
        Model.prototype.rejectChanges = function (fields, spread) {
            _super.prototype.rejectChanges.call(this, fields, spread);
            if (!(fields instanceof Array)) {
                this._isChanged = false;
            }
        };
        Model.prototype.acceptChanges = function (fields, spread) {
            _super.prototype.acceptChanges.call(this, fields, spread);
            if (!(fields instanceof Array)) {
                this._isChanged = false;
            }
        };
        Model.prototype.isChanged = function (name) {
            if (!name && this._isChanged) {
                return true;
            }
            return _super.prototype.isChanged.call(this, name);
        };    // endregion
              // region Public methods
              /**
         * Возвращает описание свойств модели.
         * @return {Object.<Property>}
         * @see properties
         * @see Property
         * @example
         * Получим описание свойств модели:
         * <pre>
         *    var User = Model.extend({
         *          _$properties: {
         *             id: {
         *                get: function() {
         *                   this._id;
         *                },
         *                set: function(value) {
         *                   this._id = value;
         *                }
         *             },
         *             group: {
         *                get: function() {
         *                   this._group;
         *                }
         *             }
         *          },
         *          _id: 0
         *          _group: null
         *       }),
         *       user = new User();
         *
         *    user.getProperties();//{id: {get: Function, set: Function}, group: {get: Function}}
         * </pre>
         */
        // endregion
        // region Public methods
        /**
         * Возвращает описание свойств модели.
         * @return {Object.<Property>}
         * @see properties
         * @see Property
         * @example
         * Получим описание свойств модели:
         * <pre>
         *    var User = Model.extend({
         *          _$properties: {
         *             id: {
         *                get: function() {
         *                   this._id;
         *                },
         *                set: function(value) {
         *                   this._id = value;
         *                }
         *             },
         *             group: {
         *                get: function() {
         *                   this._group;
         *                }
         *             }
         *          },
         *          _id: 0
         *          _group: null
         *       }),
         *       user = new User();
         *
         *    user.getProperties();//{id: {get: Function, set: Function}, group: {get: Function}}
         * </pre>
         */
        Model.prototype.getProperties = function () {
            return this._$properties;
        };    /**
         * Возвращает значение свойства по умолчанию
         * @param {String} name Название свойства
         * @return {*}
         * @example
         * Получим дефолтное значение свойства id:
         * <pre>
         *    var User = Model.extend({
         *          _$properties: {
         *             id: {
         *                get: function() {
         *                   this._id;
         *                },
         *                def: function(value) {
         *                   return Date.now();
         *                }
         *             }
         *          },
         *          _id: 0
         *       }),
         *       user = new User();
         *
         *    user.getDefault('id');//1466419984715
         *    setTimeout(function(){
         *       user.getDefault('id');//1466419984715
         *    }, 100);
         * </pre>
         */
        /**
         * Возвращает значение свойства по умолчанию
         * @param {String} name Название свойства
         * @return {*}
         * @example
         * Получим дефолтное значение свойства id:
         * <pre>
         *    var User = Model.extend({
         *          _$properties: {
         *             id: {
         *                get: function() {
         *                   this._id;
         *                },
         *                def: function(value) {
         *                   return Date.now();
         *                }
         *             }
         *          },
         *          _id: 0
         *       }),
         *       user = new User();
         *
         *    user.getDefault('id');//1466419984715
         *    setTimeout(function(){
         *       user.getDefault('id');//1466419984715
         *    }, 100);
         * </pre>
         */
        Model.prototype.getDefault = function (name) {
            var defaultPropertiesValues = this._defaultPropertiesValues;
            if (!defaultPropertiesValues) {
                defaultPropertiesValues = this._defaultPropertiesValues = {};
            }
            if (!defaultPropertiesValues.hasOwnProperty(name)) {
                var property = this._$properties[name];
                if (property && 'def' in property) {
                    defaultPropertiesValues[name] = [property.def instanceof Function ? property.def.call(this) : property.def];
                } else {
                    defaultPropertiesValues[name] = [];
                }
            }
            return defaultPropertiesValues[name][0];
        };    /**
         * Объединяет модель с данными другой модели
         * @param {WS.Data/Entity/Model} model Модель, с которой будет произведено объединение
         * @example
         * Объединим модели пользователя и группы пользователей:
         * <pre>
         *    var user = new Model({
         *          rawData: {
         *             id: 1,
         *             login: 'user1',
         *             group_id: 3
         *          }
         *       }),
         *       userGroup = new Model({
         *          rawData: {
         *             group_id: 3,
         *             group_name: 'Domain Users',
         *             group_members: 126
         *          }
         *       });
         *
         *    user.merge(userGroup);
         *    user.get('id');//1
         *    user.get('group_id');//3
         *    user.get('group_name');//'Domain Users'
         * </pre>
         */
        /**
         * Объединяет модель с данными другой модели
         * @param {WS.Data/Entity/Model} model Модель, с которой будет произведено объединение
         * @example
         * Объединим модели пользователя и группы пользователей:
         * <pre>
         *    var user = new Model({
         *          rawData: {
         *             id: 1,
         *             login: 'user1',
         *             group_id: 3
         *          }
         *       }),
         *       userGroup = new Model({
         *          rawData: {
         *             group_id: 3,
         *             group_name: 'Domain Users',
         *             group_members: 126
         *          }
         *       });
         *
         *    user.merge(userGroup);
         *    user.get('id');//1
         *    user.get('group_id');//3
         *    user.get('group_name');//'Domain Users'
         * </pre>
         */
        Model.prototype.merge = function (model) {
            try {
                var modelData_1 = {};
                model.each(function (key, val) {
                    modelData_1[key] = val;
                });
                this.set(modelData_1);
            } catch (e) {
                if (e instanceof ReferenceError) {
                    util_1.logger.info(this._moduleName + '::merge(): ' + e.toString());
                } else {
                    throw e;
                }
            }
        };    /**
         * Возвращает значение первичного ключа модели
         * @return {*}
         * @see idProperty
         * @see getIdProperty
         * @see setIdProperty
         * @example
         * Получим значение первичного ключа статьи:
         * <pre>
         *    var article = new Model({
         *       idProperty: 'id',
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.getId();//1
         * </pre>
         */
        /**
         * Возвращает значение первичного ключа модели
         * @return {*}
         * @see idProperty
         * @see getIdProperty
         * @see setIdProperty
         * @example
         * Получим значение первичного ключа статьи:
         * <pre>
         *    var article = new Model({
         *       idProperty: 'id',
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.getId();//1
         * </pre>
         */
        Model.prototype.getId = function () {
            var idProperty = this.getIdProperty();
            if (!idProperty) {
                util_1.logger.info(this._moduleName + '::getId(): idProperty is not defined');
                return undefined;
            }
            return this.get(idProperty);
        };    /**
         * Возвращает название свойства, в котором хранится первичный ключ модели
         * @return {String}
         * @see idProperty
         * @see setIdProperty
         * @see getId
         * @example
         * Получим название свойства первичного ключа:
         * <pre>
         *    var article = new Model({
         *       idProperty: 'id',
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.getIdProperty();//'id'
         * </pre>
         */
        /**
         * Возвращает название свойства, в котором хранится первичный ключ модели
         * @return {String}
         * @see idProperty
         * @see setIdProperty
         * @see getId
         * @example
         * Получим название свойства первичного ключа:
         * <pre>
         *    var article = new Model({
         *       idProperty: 'id',
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.getIdProperty();//'id'
         * </pre>
         */
        Model.prototype.getIdProperty = function () {
            return this._$idProperty;
        };    /**
         * Устанавливает название свойства, в котором хранится первичный ключ модели
         * @param {String} idProperty Название свойства для первичного ключа модели.
         * @see idProperty
         * @see getIdProperty
         * @see getId
         * @example
         * Зададим название свойства первичного ключа:
         * <pre>
         *    var article = new Model({
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.setIdProperty('id');
         *    article.getId();//1
         * </pre>
         */
        /**
         * Устанавливает название свойства, в котором хранится первичный ключ модели
         * @param {String} idProperty Название свойства для первичного ключа модели.
         * @see idProperty
         * @see getIdProperty
         * @see getId
         * @example
         * Зададим название свойства первичного ключа:
         * <pre>
         *    var article = new Model({
         *       rawData: {
         *          id: 1,
         *          title: 'How to make a Model'
         *       }
         *    });
         *    article.setIdProperty('id');
         *    article.getId();//1
         * </pre>
         */
        Model.prototype.setIdProperty = function (idProperty) {
            if (idProperty && !this.has(idProperty)) {
                util_1.logger.info(this._moduleName + '::setIdProperty(): property "' + idProperty + '" is not defined');
                return;
            }
            this._$idProperty = idProperty;
        };    // endregion
              //region Protected methods
              /**
         * Возвращает массив названий всех свойств (включая свойства в "сырых" данных)
         * @return {Array.<String>}
         * @protected
         */
        // endregion
        //region Protected methods
        /**
         * Возвращает массив названий всех свойств (включая свойства в "сырых" данных)
         * @return {Array.<String>}
         * @protected
         */
        Model.prototype._getAllProperties = function () {
            var fields = this._getRawDataFields();
            if (!this._$properties) {
                return fields;
            }
            var objProps = this._$properties;
            var props = Object.keys(objProps);
            return props.concat(fields.filter(function (field) {
                return !objProps.hasOwnProperty(field);
            }));
        };    /**
         * Вычисляет/записывает значение свойства
         * @param {String} name Имя свойства
         * @param {*} value Значение свойства
         * @param {Property} property Описание свойства
         * @param {Boolean} isReading Вычисление или запись
         * @return {*}
         * @protected
         */
        /**
         * Вычисляет/записывает значение свойства
         * @param {String} name Имя свойства
         * @param {*} value Значение свойства
         * @param {Property} property Описание свойства
         * @param {Boolean} isReading Вычисление или запись
         * @return {*}
         * @protected
         */
        Model.prototype._processCalculatedValue = function (name, value, property, isReading) {
            var _this = this;    //Check for recursive calculate
            //Check for recursive calculate
            var nowCalculatingProperties = this._nowCalculatingProperties;
            if (!nowCalculatingProperties) {
                nowCalculatingProperties = this._nowCalculatingProperties = new shim_1.Set();
            }
            var checkKey = name + '|' + isReading;
            if (nowCalculatingProperties.has(checkKey)) {
                throw new Error('Recursive value ' + (isReading ? 'reading' : 'writing') + ' detected for property "' + name + '"');
            }
            var method = isReading ? property.get : property.set;
            var isFunctor = isReading && functor_1.Compute.isFunctor(method);
            var doGathering = isReading && !isFunctor;
            var prevGathering;    //Automatic dependency gathering
            //Automatic dependency gathering
            if (isReading) {
                prevGathering = this._propertiesDependencyGathering;
                this._propertiesDependencyGathering = doGathering ? name : '';
            }    //Save user defined dependencies
            //Save user defined dependencies
            if (isFunctor) {
                method.properties.forEach(function (dependFor) {
                    _this._pushDependencyFor(dependFor, name);
                });
            }    //Get or set property value
            //Get or set property value
            try {
                nowCalculatingProperties.add(checkKey);
                value = method.call(this, value);
            } finally {
                if (isReading) {
                    this._propertiesDependencyGathering = prevGathering;
                }
                nowCalculatingProperties.delete(checkKey);
            }
            return value;
        };    /**
         * Добавляет зависимое свойство для текущего рассчитываемого
         * @param {String} name Название свойства.
         * @protected
         */
        /**
         * Добавляет зависимое свойство для текущего рассчитываемого
         * @param {String} name Название свойства.
         * @protected
         */
        Model.prototype._pushDependency = function (name) {
            if (this._propertiesDependencyGathering && this._propertiesDependencyGathering !== name) {
                this._pushDependencyFor(name, this._propertiesDependencyGathering);
            }
        };    /**
         * Добавляет зависимое свойство
         * @param {String} name Название свойства.
         * @param {String} dependFor Название свойства, котороое зависит от name
         * @protected
         */
        /**
         * Добавляет зависимое свойство
         * @param {String} name Название свойства.
         * @param {String} dependFor Название свойства, котороое зависит от name
         * @protected
         */
        Model.prototype._pushDependencyFor = function (name, dependFor) {
            var propertiesDependency = this._propertiesDependency;
            if (!propertiesDependency) {
                propertiesDependency = this._propertiesDependency = new shim_1.Map();
            }
            var data;
            if (propertiesDependency.has(name)) {
                data = propertiesDependency.get(name);
            } else {
                data = new shim_1.Set();
                propertiesDependency.set(name, data);
            }
            if (!data.has(dependFor)) {
                data.add(dependFor);
            }
        };    /**
         * Удаляет закешированное значение для свойства и всех от него зависимых свойств
         * @param {String} name Название свойства.
         * @protected
         */
        /**
         * Удаляет закешированное значение для свойства и всех от него зависимых свойств
         * @param {String} name Название свойства.
         * @protected
         */
        Model.prototype._deleteDependencyCache = function (name) {
            var _this = this;
            var propertiesDependency = this._propertiesDependency;
            if (propertiesDependency && propertiesDependency.has(name)) {
                propertiesDependency.get(name).forEach(function (related) {
                    _this._removeChild(_this._fieldsCache.get(related));
                    _this._fieldsCache.delete(related);
                    _this._fieldsClone.delete(related);
                    _this._deleteDependencyCache(related);
                });
            }
        };    //endregion
              //region Statics
        //endregion
        //region Statics
        Model.fromObject = function (data, adapter) {
            var record = Record_1.default.fromObject(data, adapter);
            if (!record) {
                return record;
            }
            return new Model({
                rawData: record.getRawData(true),
                adapter: record.getAdapter(),
                format: record._getFormat(true)    //"Anakin, I Am Your Son"
            });
        };
        //"Anakin, I Am Your Son"
        return Model;
    }(util_1.mixin(Record_1.default, InstantiableMixin_1.default));
    exports.default = Model;
    Model.prototype['[Data/_type/Model]'] = true;    // @ts-ignore
    // @ts-ignore
    Model.prototype['[Data/_type/IInstantiable]'] = true;
    Model.prototype._moduleName = 'Data/type:Model';
    Model.prototype._instancePrefix = 'model-';
    Model.prototype._$properties = null;
    Model.prototype._$idProperty = '';
    Model.prototype._isDeleted = false;
    Model.prototype._defaultPropertiesValues = null;
    Model.prototype._propertiesDependency = null;
    Model.prototype._propertiesDependencyGathering = '';
    Model.prototype._nowCalculatingProperties = null;    //FIXME: backward compatibility for check via Core/core-instance::instanceOfModule()
    //FIXME: backward compatibility for check via Core/core-instance::instanceOfModule()
    Model.prototype['[WS.Data/Entity/Model]'] = true;    //FIXME: backward compatibility for Core/core-extend: Model should have exactly its own property 'produceInstance'
                                                         // @ts-ignore
    //FIXME: backward compatibility for Core/core-extend: Model should have exactly its own property 'produceInstance'
    // @ts-ignore
    Model.produceInstance = Record_1.default.produceInstance;
    util_1.di.register('Data/type:Model', Model, { instantiate: false });    // FIXME: deprecated
    // FIXME: deprecated
    util_1.di.register('entity.model', Model);
});