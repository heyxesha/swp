/// <amd-module name="Data/_type/FormattableMixin" />
/**
 * Миксин, предоставляющий поведение владения форматом полей и доступа к их значениям в сырых данных через адаптер.
 * @mixin WS.Data/Entity/FormattableMixin
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/FormattableMixin', [
    'require',
    'exports',
    'Data/_type/format',
    'Data/_type/adapter',
    'Data/util'
], function (require, exports, format_1, adapter_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var defaultAdapter = 'Data/type:adapter.Json';    /**
     * Строит формат, объединяя частичный формат и формат, построенный по сырым данным
     * @param {Object>} sliceFormat Частичное описание формата
     * @param {WS.Data/Format/Format>} rawDataFormat Формат из сырых данных
     * @return {WS.Data/Format/Format}
     */
    /**
     * Строит формат, объединяя частичный формат и формат, построенный по сырым данным
     * @param {Object>} sliceFormat Частичное описание формата
     * @param {WS.Data/Format/Format>} rawDataFormat Формат из сырых данных
     * @return {WS.Data/Format/Format}
     */
    function buildFormatFromObject(sliceFormat, rawDataFormat) {
        var field;
        var fieldIndex;
        for (var name in sliceFormat) {
            if (!sliceFormat.hasOwnProperty(name)) {
                continue;
            }
            field = sliceFormat[name];
            if (typeof field !== 'object') {
                field = { type: field };
            }
            if (!(field instanceof format_1.Field)) {
                field = format_1.fieldsFactory(field);
            }
            field.setName(name);
            fieldIndex = rawDataFormat.getFieldIndex(name);
            if (fieldIndex === -1) {
                rawDataFormat.add(field);
            } else {
                rawDataFormat.replace(field, fieldIndex);
            }
        }
        return rawDataFormat;
    }    /**
     * Строит формат полей сырым данным
     * @return {WS.Data/Format/Format}
     */
    /**
     * Строит формат полей сырым данным
     * @return {WS.Data/Format/Format}
     */
    function buildFormatByRawData() {
        var Format = util_1.di.resolve('Data/collection:format.Format');
        var format = new Format();
        var adapter = this._getRawDataAdapter();
        var fields = this._getRawDataFields();
        var count = fields.length;
        for (var i = 0; i < count; i++) {
            format.add(adapter.getFormat(fields[i]));
        }
        return format;
    }    /**
     * Строит сырые данные по формату если он был явно задан
     */
    /**
     * Строит сырые данные по формату если он был явно задан
     */
    function buildRawData() {
        var _this = this;
        if (this._hasFormat()) {
            var adapter_2 = this._getRawDataAdapter();
            var fields_1 = adapter_2.getFields();
            if (adapter_2['[Data/_type/adapter/IDecorator]']) {
                adapter_2 = adapter_2.getOriginal();
            }    //TODO: solve the problem of data normalization
            //TODO: solve the problem of data normalization
            if (adapter_2._touchData) {
                adapter_2._touchData();
            }
            this._getFormat().each(function (fieldFormat) {
                try {
                    if (fields_1.indexOf(fieldFormat.getName()) === -1) {
                        adapter_2.addField(fieldFormat);
                    }
                } catch (e) {
                    util_1.logger.info(_this._moduleName + '::constructor(): can\'t add raw data field (' + e.message + ')');
                }
            });
        }
    }
    var FormattableMixin = /** @lends WS.Data/Entity/FormattableMixin.prototype */
    {
        '[Data/_type/FormattableMixin]': true,
        //FIXME: backward compatibility for check via Core/core-instance::instanceOfMixin()
        '[WS.Data/Entity/FormattableMixin]': true,
        /**
         * @cfg {Object} Данные в "сыром" виде.
         * @name WS.Data/Entity/FormattableMixin#rawData
         * @see getRawData
         * @see setRawData
         * @remark
         * Данные должны быть в формате, поддерживаемом адаптером {@link adapter}.
         * Данные должны содержать только примитивные значения или простые массивы (Array) или объекты (Object).
         * @example
         * Создадим новую запись с данными сотрудника:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var user = new Record({
         *          rawData: {
         *             id: 1,
         *             firstName: 'John',
         *           lastName: 'Smith'
         *          }
         *       });
         *
         *       console.log(user.get('id'));// 1
         *       console.log(user.get('firstName'));// John
         *       console.log(user.get('lastName'));// Smith
         *    });
         * </pre>
         * Создадим рекордсет с персонажами фильма:
         * <pre>
         *    require(['WS.Data/Collection/RecordSet'], function (RecordSet) {
         *       var characters = new RecordSet({
         *          rawData: [{
         *             id: 1,
         *             firstName: 'John',
         *             lastName: 'Connor',
         *             role: 'Savior'
         *          }, {
         *             id: 2,
         *             firstName: 'Sarah',
         *             lastName: 'Connor',
         *             role: 'Mother'
         *          }, {
         *             id: 3,
         *             firstName: '-',
         *             lastName: 'T-800',
         *             role: 'Terminator'
         *          }]
         *       });
         *
         *
         *       console.log(characters.at(0).get('firstName'));// John
         *       console.log(characters.at(0).get('lastName'));// Connor
         *       console.log(characters.at(1).get('firstName'));// Sarah
         *       console.log(characters.at(1).get('lastName'));// Connor
         *    });
         * </pre>
         */
        _$rawData: null,
        // {Object} При работе с сырыми данными использовать режим Copy-On-Write.
        _$cow: false,
        /**
         * @cfg {String|WS.Data/Adapter/IAdapter} Адаптер для работы с данными, по умолчанию {@link WS.Data/Adapter/Json}.
         * @name WS.Data/Entity/FormattableMixin#adapter
         * @see getAdapter
         * @see WS.Data/Adapter/Json
         * @see WS.Data/Di
         * @remark
         * Адаптер должен быть предназначен для формата, в котором получены сырые данные {@link rawData}.
         * По умолчанию обрабатываются данные в формате JSON (ключ -> значение).
         * @example
         * Создадим запись с адаптером для данных в формате БЛ СБИС, внедренным в виде названия зарегистрированной зависимости:
         * <pre>
         *    require(['WS.Data/Entity/Record', 'WS.Data/Adapter/Sbis'], function (Record) {
         *       var user = new Record({
         *          adapter: 'Data/type:adapter.Sbis',
         *          format: [
         *             {name: 'login', type: 'string'},
         *             {name: 'email', type: 'string'}
         *          ]
         *       });
         *       user.set({
         *          login: 'root',
         *          email: 'root@server.name'
         *       });
         *    });
         * </pre>
         * Создадим запись с адаптером для данных в формате БЛ СБИС, внедренным в виде готового экземпляра:
         * <pre>
         *    require(['WS.Data/Entity/Record', 'WS.Data/Adapter/Sbis'], function (Record, SbisAdapter) {
         *       var user = new Record({
         *          adapter: new SbisAdapter(),
         *          format: [
         *             {name: 'login', type: 'string'},
         *             {name: 'email', type: 'string'}
         *          ]
         *       });
         *       user.set({
         *          login: 'root',
         *          email: 'root@server.name'
         *       });
         *    });
         * </pre>
         */
        _$adapter: defaultAdapter,
        /**
         * @cfg {WS.Data/Format/Format|Array.<WS.Data/Format/FieldsFactory/FieldDeclaration.typedef>|Object.<String,String>|Object.<String,Function>|Object.<String,WS.Data/Format/FieldsFactory/FieldDeclaration.typedef>|Object.<String,WS.Data/Format/Field>} Формат всех полей (если задан массивом или экземпляром {@link WS.Data/Format/Format Format}), либо формат отдельных полей (если задан объектом).
         * @name WS.Data/Entity/FormattableMixin#format
         * @see getFormat
         * @remark Правила {@link getFormat формирования формата} в зависимости от типа значения опции:
         * <ul>
         * <li>если формат явно не задан, то он будет построен по сырым данным;
         * <li>если формат задан для части полей (Object), то он будет построен по сырым данным; для полей с совпадающими именами формат будет заменен на явно указанный, формат полей с несовпадающими именами будет добавлен в конец;
         * <li>если формат задан для всех полей (Array или WS.Data/Format/Format), то будет использован именно он, независимо от набора полей в сырых данных.
         * @example
         * Создадим запись с указанием формата полей, внедренным в декларативном виде:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function(Record) {
         *       var user = new Record({
         *          format: [{
         *             name: 'id',
         *             type: 'integer'
         *          }, {
         *             name: 'login',
         *             type: 'string'
         *          }, {
         *             name: 'amount',
         *             type: 'money',
         *             precision: 4
         *          }]
         *       });
         *    });
         * </pre>
         * Создадим рекордсет с указанием формата полей, внедренным в виде готового экземпляра:
         * <pre>
         *    //My.Format.User.module.js
         *    define('My.Format.User', [
         *       'WS.Data/Format/Format',
         *       'WS.Data/Format/IntegerField',
         *       'WS.Data/Format/StringField'
         *    ], function(Format, IntegerField, StringField) {
         *       var format = new Format();
         *       format.add(new IntegerField({name: 'id'}));
         *       format.add(new StringField({name: 'login'}));
         *       format.add(new StringField({name: 'email'}));
         *
         *       return format;
         *    });
         *
         *    //Users.js
         *    require([
         *       'WS.Data/Collection/RecordSet',
         *       'My.Format.User'
         *    ], function (RecordSet, userFormat) {
         *       var users = new RecordSet({
         *          format: userFormat
         *       });
         *    });
         * </pre>
         * Создадим запись, для которой зададим формат полей 'id' и 'amount', внедренный в декларативном виде:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function(Record) {
         *       var user = new Record({
         *          rawData: {
         *             id: 256,
         *             login: 'dr.strange',
         *             amount: 15739.45
         *          },
         *          format: {
         *             id: 'integer',
         *             amount: {type: 'money', precision: 4}
         *          }]
         *       });
         *    });
         * </pre>
         * Создадим запись, для которой зададим формат поля 'amount', внедренный в виде готового экземпляра:
         * <pre>
         *    require([
         *       'WS.Data/Entity/Record',
         *       'WS.Data/Format/MoneyField'
         *    ], function(Record, MoneyField) {
         *       var amountField = new MoneyField({precision: 4}),
         *          user = new Record({
         *             format: {
         *                amount: amountField
         *             }]
         *          });
         *    });
         * </pre>
         * Укажем тип Number для поля "Идентификатор" и тип Date для поля "Время последнего входа" учетной записи пользователя:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function(Record) {
         *       var user = new Record({
         *          format: {
         *             id: Number,
         *             lastLogin: Date
         *          }
         *       });
         *    });
         * </pre>
         * Внедрим рекордсет со своей моделью в одно из полей записи:
         * <pre>
         *    //ActivityModel.js
         *    require('MyApplication/Models/ActivityModel', [
         *       'WS.Data/Entity/Model'
         *    ], function(Model) {
         *       return Model.extend({
         *          //...
         *       });
         *    });
         *
         *    //ActivityRecordSet.js
         *    require('MyApplication/ViewModels/ActivityRecordSet', [
         *       'WS.Data/Collection/RecordSet'
         *       'MyApplication/Models/ActivityModel'
         *    ], function(RecordSet, ActivityModel) {
         *       return RecordSet.extend({
         *          _$model: ActivityModel
         *       });
         *    });
         *
         *    //ActivityController.js
         *    require('MyApplication/Controllers/ActivityController', [
         *       'WS.Data/Entity/Record'
         *       'MyApplication/ViewModels/ActivityRecordSet'
         *    ], function(Record, ActivityRecordSet) {
         *       var user = new Record({
         *          format: {
         *             activity: ActivityRecordSet
         *          }
         *       });
         *       //...
         *    });
         * </pre>
         * Создадим запись заказа в магазине с полем типа "рекордсет", содержащим список позиций. Сырые данные будут в формате БЛ СБИС:
         * <pre>
         *    require([
         *       'WS.Data/Entity/Record',
         *       'WS.Data/Collection/RecordSet',
         *       'WS.Data/Adapter/Sbis'
         *    ], function (Record, RecordSet) {
         *       var order = new Record({
         *             adapter: 'Data/type:adapter.Sbis',
         *             format:[{
         *                name: 'id',
         *                type: 'integer',
         *                defaultValue: 0
         *             }, {
         *                name: 'items',
         *                type: 'recordset'
         *             }]
         *          }),
         *          orderItems = new RecordSet({
         *             adapter: 'Data/type:adapter.Sbis',
         *             format: [{
         *                name: 'goods_id',
         *                type: 'integer',
         *                defaultValue: 0
         *             },{
         *                name: 'price',
         *                type: 'real',
         *                defaultValue: 0
         *             },{
         *               name: 'count',
         *               type: 'integer',
         *               defaultValue: 0
         *             }]
         *          });
         *
         *       order.set('items', orderItems);
         *    });
         * </pre>
         * Формат поля для массива значений смотрите в описании {@link WS.Data/Format/ArrayField}.
         */
        _$format: null,
        /**
         * @member {WS.Data/Format/Format} Формат полей (собранный из опции format или в результате манипуляций)
         */
        _format: null,
        /**
         * @member {WS.Data/Format/Format} Клон формата полей (для кэшеирования результата getFormat())
         */
        _formatClone: null,
        /**
         * @member {WS.Data/Adapter/ITable|WS.Data/Adapter/IRecord} Адаптер для данных в "сыром" виде
         */
        _rawDataAdapter: null,
        /**
         * @member {Array.<String>} Описание всех полей, полученных из данных в "сыром" виде
         */
        _rawDataFields: null,
        constructor: function () {
            //FIXME: get rid of _options
            if (!this._$format && this._options && this._options.format) {
                this._$format = this._options.format;
            }
            buildRawData.call(this);
        },
        //region WS.Data/Entity/SerializableMixin
        _getSerializableState: function (state) {
            state.$options.rawData = this._getRawData();
            return state;
        },
        _setSerializableState: function (state) {
            return function () {
            };
        },
        //endregion WS.Data/Entity/SerializableMixin
        //region Public methods
        /**
         * Возвращает данные в "сыром" виде. Если данные являются объектом, то возвращается его дубликат.
         * @return {Object}
         * @see setRawData
         * @see rawData
         * @example
         * Получим сырые данные статьи:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var data = {id: 1, title: 'Article 1'},
         *          article = new Record({
         *             rawData: data
         *        });
         *
         *       console.log(article.getRawData());// {id: 1, title: 'Article 1'}
         *       console.log(article.getRawData() === data);// false
         *       console.log(JSON.stringify(article.getRawData()) === JSON.stringify(data));// true
         *    });
         * </pre>
         */
        getRawData: function (shared) {
            return shared ? this._getRawData() : util_1.object.clone(this._getRawData());
        },
        /**
         * Устанавливает данные в "сыром" виде.
         * @param data {Object} Данные в "сыром" виде.
         * @see getRawData
         * @see rawData
         * @example
         * Установим сырые данные статьи:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var article = new Record();
         *       article.setRawData({id: 1, title: 'Article 1'});
         *       console.log(article.get('title'));// Article 1
         *    });
         * </pre>
         */
        setRawData: function (data) {
            this._resetRawDataAdapter(data);
            this._resetRawDataFields();
            this._clearFormatClone();
            buildRawData.call(this);
        },
        /**
         * Возвращает адаптер для работы с данными в "сыром" виде.
         * @return {WS.Data/Adapter/IAdapter}
         * @see adapter
         * @example
         * Проверим, что по умолчанию используется адаптер для формата JSON:
         * <pre>
         *    require(['WS.Data/Entity/Record', 'WS.Data/Adapter/Json'], function (Record, JsonAdapter) {
         *       var article = new Record();
         *       console.log(article.getAdapter() instanceof JsonAdapter);// true
         *    });
         * </pre>
         */
        getAdapter: function () {
            var adapter = this._getAdapter();
            if (adapter['[Data/_type/adapter/IDecorator]']) {
                adapter = adapter.getOriginal();
            }
            return adapter;
        },
        /**
         * Возвращает формат полей (в режиме только для чтения)
         * @return {WS.Data/Format/Format}
         * @see format
         * @example
         * Получим формат, сконструированный из декларативного описания:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var article = new Record({
         *             format: [
         *                {name: 'id', type: 'integer'},
         *                {name: 'title', type: 'string'}
         *             ]
         *          }),
         *          format = article.getFormat();
         *
         *       console.log(format.at(0).getName());// 'id'
         *       console.log(format.at(1).getName());// 'title'
         *    });
         * </pre>
         * Получим формат, сконструированный из сырых данных:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var article = new Record({
         *             rawData: {
         *                id: 1,
         *                title: 'What About Livingstone'
         *             }
         *          }),
         *          format = article.getFormat();
         *
         *       console.log(format.at(0).getName());// 'id'
         *       console.log(format.at(1).getName());// 'title'
         *    });
         * </pre>
         */
        getFormat: function (shared) {
            if (shared) {
                return this._getFormat(true);
            }
            if (!this._formatClone) {
                this._formatClone = this._getFormat(true).clone(true);
            }
            return this._formatClone;
        },
        /**
         * Добавляет поле в формат.
         * @remark
         * Если позиция не указана (или указана как -1), поле добавляется в конец формата.
         * Если поле с таким форматом уже есть, генерирует исключение.
         * @param {WS.Data/Format/Field|WS.Data/Format/FieldsFactory/FieldDeclaration.typedef} format Формат поля.
         * @param {Number} [at] Позиция поля.
         * @see format
         * @see removeField
         * @example
         * Добавим поля в виде декларативного описания:
         * <pre>
         *    require(['WS.Data/Entity/Record'], function (Record) {
         *       var record = new Record();
         *       record.addField({name: 'login', type: 'string'});
         *       record.addField({name: 'amount', type: 'money', precision: 3});
         *    });
         * </pre>
         * Добавим поля в виде экземпляров:
         * <pre>
         *    require([
         *       'WS.Data/Collection/RecordSet',
         *       'WS.Data/Format/StringField',
         *       'WS.Data/Format/MoneyField'
         *    ], function (RecordSet, StringField, MoneyField) {
         *       var recordset = new RecordSet();
         *       recordset.addField(new StringField({name: 'login'}));
         *       recordset.addField(new MoneyField({name: 'amount', precision: 3}));
         *    });
         * </pre>
         */
        addField: function (format, at) {
            format = this._buildField(format);
            this._$format = this._getFormat(true);
            this._$format.add(format, at);
            this._getRawDataAdapter().addField(format, at);
            this._resetRawDataFields();
            this._clearFormatClone();
        },
        /**
         * Удаляет поле из формата по имени.
         * @remark
         * Если поля с таким именем нет, генерирует исключение.
         * @param {String} name Имя поля
         * @see format
         * @see addField
         * @see removeFieldAt
         * @example
         * Удалим поле login:
         * <pre>
         *    record.removeField('login');
         * </pre>
         */
        removeField: function (name) {
            this._$format = this._getFormat(true);
            this._$format.removeField(name);
            this._getRawDataAdapter().removeField(name);
            this._resetRawDataFields();
            this._clearFormatClone();
        },
        /**
         * Удаляет поле из формата по позиции.
         * @remark
         * Если позиция выходит за рамки допустимого индекса, генерирует исключение.
         * @param {Number} at Позиция поля.
         * @see format
         * @see addField
         * @see removeField
         * @example
         * Удалим первое поле:
         * <pre>
         *    record.removeFieldAt(0);
         * </pre>
         */
        removeFieldAt: function (at) {
            this._$format = this._getFormat(true);
            this._$format.removeAt(at);
            this._getRawDataAdapter().removeFieldAt(at);
            this._resetRawDataFields();
            this._clearFormatClone();
        },
        //endregion Public methods
        //region Protected methods
        /**
         * Возвращает данные в "сыром" виде из _rawDataAdapter (если он был создан) или исходные
         * @param {Boolean} [direct=false] Напрямую, не используя адаптер
         * @return {Object}
         * @protected
         */
        _getRawData: function (direct) {
            if (!direct && this._rawDataAdapter) {
                return this._rawDataAdapter.getData();
            }
            return typeof this._$rawData === 'function' ? this._$rawData() : this._$rawData;
        },
        /**
         * Возвращает адаптер по-умолчанию в случае, если опция 'adapter' не была переопределена в подмешивающем миксин коде.
         * @protected
         * @deprecated Метод _getDefaultAdapter() не рекомендуется к использованию. Используйте опцию adapter.
         */
        _getDefaultAdapter: function () {
            return defaultAdapter;
        },
        /**
         * Возвращает адаптерр для сырых данных
         * @return {WS.Data/Adapter/IAdapter}
         * @protected
         */
        _getAdapter: function () {
            if (this._$adapter === defaultAdapter && FormattableMixin._getDefaultAdapter !== this._getDefaultAdapter) {
                this._$adapter = this._getDefaultAdapter();
            }
            if (this._$adapter && !(this._$adapter instanceof Object)) {
                this._$adapter = util_1.di.create(this._$adapter);
            }
            if (this._$cow && !this._$adapter['[Data/_type/adapter/IDecorator]']) {
                this._$adapter = new adapter_1.Cow(this._$adapter);
            }
            return this._$adapter;
        },
        /**
         * Возвращает адаптер для сырых данных заданного вида
         * @return {WS.Data/Adapter/ITable|WS.Data/Adapter/IRecord}
         * @protected
         */
        _getRawDataAdapter: function () {
            if (!this._rawDataAdapter) {
                this._rawDataAdapter = this._createRawDataAdapter();
            }
            return this._rawDataAdapter;
        },
        /**
         * Создает адаптер для сырых данных
         * @return {WS.Data/Adapter/ITable|WS.Data/Adapter/IRecord}
         * @protected
         */
        _createRawDataAdapter: function () {
            throw new Error('Method must be implemented');
        },
        /**
         * Сбрасывает адаптер для сырых данных
         * @param {*} [data] Сырые данные
         * @protected
         */
        _resetRawDataAdapter: function (data) {
            if (data === undefined) {
                if (this._rawDataAdapter && typeof this._$rawData !== 'function') {
                    //Save possible rawData changes
                    this._$rawData = this._rawDataAdapter.getData();
                }
            } else {
                this._$rawData = data;
            }
            this._rawDataAdapter = null;
        },
        /**
         * Проверяет совместимость адаптеров
         * @param {WS.Data/Adapter/IAdapter} foreign Адаптер внешнего объекта
         * @protected
         */
        _checkAdapterCompatibility: function (foreign) {
            var internal = this._getAdapter();
            if (foreign['[Data/_type/adapter/IDecorator]']) {
                foreign = foreign.getOriginal();
            }
            if (internal['[Data/_type/adapter/IDecorator]']) {
                internal = internal.getOriginal();
            }
            var internalProto = Object.getPrototypeOf(internal);
            if (!internalProto.isPrototypeOf(foreign)) {
                throw new TypeError('The foreign adapter "' + foreign._moduleName + '" is incompatible with the internal adapter "' + internal._moduleName + '"');
            }
        },
        /**
         * Возвращает список полей записи, полученный из "сырых" данных
         * @return {Array.<String>}
         * @protected
         */
        _getRawDataFields: function () {
            return this._rawDataFields || (this._rawDataFields = this._getRawDataAdapter().getFields());
        },
        /**
         * Добавляет поле в список полей
         * @param {String} name Название поля
         * @protected
         */
        _addRawDataField: function (name) {
            this._getRawDataFields().push(name);
        },
        /**
         * Сбрасывает список полей записи, полученный из "сырых" данных
         * @protected
         */
        _resetRawDataFields: function () {
            this._rawDataFields = null;
        },
        /**
         * Возвращает формат полей
         * @param {Boolean} [build=false] Принудительно создать, если не задан
         * @return {WS.Data/Format/Format}
         * @protected
         */
        _getFormat: function (build) {
            var _this = this;
            if (!this._format) {
                if (this._hasFormat()) {
                    this._format = this._$format = FormattableMixin._buildFormat(this._$format, function () {
                        return buildFormatByRawData.call(_this);
                    });
                } else if (build) {
                    this._format = buildFormatByRawData.call(this);
                }
            }
            return this._format;
        },
        /**
         * Очищает формат полей. Это можно сделать только если формат не был установлен явно.
         * @protected
         */
        _clearFormat: function () {
            if (this._hasFormat()) {
                throw new Error(this._moduleName + ': format can\'t be cleared because it\'s defined directly');
            }
            this._format = null;
            this._clearFormatClone();
        },
        /**
         * Очищает клон формата полей.
         * @protected
         */
        _clearFormatClone: function () {
            this._formatClone = null;
        },
        /**
         * Возвращает признак, что формат полей был установлен явно
         * @return {Boolean}
         * @protected
         */
        _hasFormat: function () {
            return !!this._$format;
        },
        /**
         * Возвращает формат поля с указанным названием
         * @param {String} name Название поля
         * @param {WS.Data/Adapter/ITable|WS.Data/Adapter/IRecord} adapter Адаптер
         * @return {WS.Data/Format/Field|WS.Data/Format/UniversalField}
         * @protected
         */
        _getFieldFormat: function (name, adapter) {
            if (this._hasFormat()) {
                var fields = this._getFormat();
                var index = fields.getFieldIndex(name);
                if (index > -1) {
                    return fields.at(index);
                }
            }
            return adapter.getSharedFormat(name);
        },
        /**
         * Возвращает тип значения поля по его формату
         * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
         * @return {String|Function}
         * @protected
         */
        _getFieldType: function (format) {
            var Type = format.getType ? format.getType() : format.type;
            if (Type && typeof Type === 'string') {
                if (util_1.di.isRegistered(Type)) {
                    Type = util_1.di.resolve(Type);
                }
            }
            return Type;
        },
        /**
         * Строит формат поля по описанию
         * @param {WS.Data/Format/Field|WS.Data/Format/FieldsFactory/FieldDeclaration.typedef} format Описание формата поля
         * @return {WS.Data/Format/Field}
         * @protected
         */
        _buildField: function (format) {
            if (typeof format === 'string' || Object.getPrototypeOf(format) === Object.prototype) {
                format = format_1.fieldsFactory(format);
            }
            if (!format || !(format instanceof format_1.Field)) {
                throw new TypeError(this._moduleName + ': format should be an instance of Data/type:format.Field');
            }
            return format;
        },
        /**
         * Строит формат полей по описанию
         * @param {WS.Data/Format/Format|Array.<WS.Data/Format/FieldsFactory/FieldDeclaration.typedef>|Object} format Описание формата (полное либо частичное)
         * @param {Function} fullFormatCallback Метод, возвращающий полный формат
         * @return {WS.Data/Format/Format}
         * @static
         * @protected
         */
        _buildFormat: function (format, fullFormatCallback) {
            var Format = util_1.di.resolve('Data/collection:format.Format');
            if (format) {
                var formatProto = Object.getPrototypeOf(format);
                if (formatProto === Array.prototype) {
                    var factory = util_1.di.resolve('Data/collection:format.factory');    //All of the fields in Array
                    //All of the fields in Array
                    format = factory(format);
                } else if (formatProto === Object.prototype) {
                    //Slice of the fields in Object
                    format = buildFormatFromObject(format, fullFormatCallback ? fullFormatCallback() : new Format());
                }
            }
            if (!format || !(format instanceof Format)) {
                format = new Format();
            }
            return format;
        }    //endregion Protected methods
    };
    //endregion Protected methods
    exports.default = FormattableMixin;
});