/// <amd-module name="Data/_type/adapter/Abstract" />
/**
 * Абстрактный адаптер для данных.
 * Это абстрактный класс, не предназначенный для создания самостоятельных экземпляров.
 * @class WS.Data/Adapter/Abstract
 * @extends WS.Data/Entity/Abstract
 * @implements WS.Data/Adapter/IAdapter
 * @mixes WS.Data/Entity/SerializableMixin
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/adapter/Abstract', [
    'require',
    'exports',
    'tslib',
    'Data/_type/Abstract',
    'Data/_type/SerializableMixin',
    'Data/util',
    'Core/helpers/Date/toSql'
], function (require, exports, tslib_1, Abstract_1, SerializableMixin_1, util_1, toSql) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var serializer = function () {
        var serialize = function (data) {
            if (data instanceof Array) {
                return serializeArray(data);
            } else if (data && typeof data === 'object') {
                return serializeObject(data);
            } else {
                return data;
            }
        };
        var serializeArray = function (arr) {
            return arr.map(function (item) {
                return serialize(item);
            });
        };
        var serializeObject = function (obj) {
            if (typeof obj.getRawData === 'function') {
                //Instance of WS.Data/Entity/Record || WS.Data/Collection/RecordSet || WS.Data/Source/DataSet
                return obj.getRawData(true);
            } else if (obj instanceof Date) {
                var mode = toSql.MODE_DATETIME;
                obj = obj;
                if (obj.getSQLSerializationMode) {
                    switch (obj.getSQLSerializationMode()) {
                    case Date.SQL_SERIALIZE_MODE_DATE:
                        mode = toSql.MODE_DATE;
                        break;
                    case Date.SQL_SERIALIZE_MODE_TIME:
                        mode = toSql.MODE_TIME;
                        break;
                    }
                }
                return toSql(obj, mode);
            } else {
                //Check if 'obj' is a scalar value wrapper
                if (obj.valueOf) {
                    obj = obj.valueOf();
                }
                if (obj && typeof obj === 'object') {
                    return serializePlainObject(obj);
                }
                return obj;
            }
        };
        var serializePlainObject = function (obj) {
            var result = {};
            var proto = Object.getPrototypeOf(obj);
            if (proto !== null && proto !== Object.prototype) {
                throw new TypeError('Unsupported object type. Only plain objects can be serialized.');
            }
            var keys = Object.keys(obj);
            var key;
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                result[key] = serialize(obj[key]);
            }
            return result;
        };
        return { serialize: serialize };
    }();
    var Abstract = /** @class */
    function (_super) {
        tslib_1.__extends(Abstract, _super);
        function Abstract() {
            var _this = _super.call(this) || this;
            SerializableMixin_1.default.constructor.call(_this);
            return _this;
        }
        Abstract.prototype.getProperty = function (data, property) {
            property = property || '';
            var parts = property.split(this._pathSeparator);
            var result;
            for (var i = 0; i < parts.length; i++) {
                result = i ? result ? result[parts[i]] : undefined : data ? data[parts[i]] : undefined;
            }
            return result;
        };
        Abstract.prototype.setProperty = function (data, property, value) {
            if (!data || !(data instanceof Object)) {
                return;
            }
            property = property || '';
            var parts = property.split(this._pathSeparator);
            var current = data;
            for (var i = 0, max = parts.length - 1; i <= max; i++) {
                if (i === max) {
                    current[parts[i]] = value;
                } else {
                    if (current[parts[i]] === undefined) {
                        current[parts[i]] = {};
                    }
                    current = current[parts[i]];
                }
            }
        };
        Abstract.prototype.serialize = function (data) {
            return serializer.serialize(data);
        };
        Abstract.prototype.forRecord = function (data, tableData) {
            throw new Error('Method must be implemented');
        };
        Abstract.prototype.forTable = function (data) {
            throw new Error('Method must be implemented');
        };
        Abstract.prototype.getKeyField = function (data) {
            throw new Error('Method must be implemented');
        };
        return Abstract;
    }(util_1.mixin(Abstract_1.default, SerializableMixin_1.default));
    exports.default = Abstract;
    Abstract.prototype['[Data/_type/adapter/Abstract]'] = true;    // @ts-ignore
    // @ts-ignore
    Abstract.prototype['[Data/_type/adapter/IAdapter]'] = true;
    Abstract.prototype._pathSeparator = '.';
});