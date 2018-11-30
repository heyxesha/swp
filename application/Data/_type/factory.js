/// <amd-module name="Data/_type/factory" />
/**
 * Фабрика типов - перобразует исходные значения в типизированные и наоборот.
 * @class WS.Data/Factory
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/factory', [
    'require',
    'exports',
    'Data/_type/format',
    'Data/util',
    'Core/core-instance',
    'Core/helpers/Date/toSql',
    'Core/helpers/Date/fromSql',
    'Core/TimeInterval',
    'Core/defaultRenders'
], function (require, exports, format_1, util_1, coreInstance, toSql, fromSql, CoreTimeInterval, renders) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * @const {RegExp} Выделяет временную зону в строковом представлении Date
     */
    /**
     * @const {RegExp} Выделяет временную зону в строковом представлении Date
     */
    var SQL_TIME_ZONE = /[+-][0-9]+$/;    /**
     * Возвращает словарь для поля типа "Словарь"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {Array}
     */
    /**
     * Возвращает словарь для поля типа "Словарь"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {Array}
     */
    function getDictionary(format) {
        return (format instanceof format_1.DictionaryField ? format.getDictionary() : format.meta && format.meta.dictionary) || [];
    }    /**
     * Возвращает признак, что значение типа Enum может быть null
     * @param {*} value Значение.
     * @param {Object} options Опции.
     * @return {Boolean}
     */
    /**
     * Возвращает признак, что значение типа Enum может быть null
     * @param {*} value Значение.
     * @param {Object} options Опции.
     * @return {Boolean}
     */
    function isEnumNullable(value, options) {
        var dict = getDictionary(options.format);
        if (value === null && !dict.hasOwnProperty(value)) {
            return true;
        } else if (value === undefined) {
            return true;
        }
        return false;
    }    /**
     * Возвращает признак, что значение типа может быть null
     * @param {String|Function} type Тип значения.
     * @param {*} value Значение.
     * @param {Object} [options] Опции.
     * @return {Boolean}
     */
    /**
     * Возвращает признак, что значение типа может быть null
     * @param {String|Function} type Тип значения.
     * @param {*} value Значение.
     * @param {Object} [options] Опции.
     * @return {Boolean}
     */
    function isNullable(type, value, options) {
        if (value === undefined || value === null) {
            switch (type) {
            case 'identity':
                return false;
            case 'enum':
                return isEnumNullable(value, options);
            }
            if (typeof type === 'function') {
                var inst = Object.create(type.prototype);
                if (inst && inst['[Data/_collection/IEnum]']) {
                    return isEnumNullable(value, options);
                }
            }
            return true;
        }
        return false;
    }    /**
     * Возвращает скалярное значение из массива
     * @param {*} value Значение
     * @return {*}
     */
    /**
     * Возвращает скалярное значение из массива
     * @param {*} value Значение
     * @return {*}
     */
    function toScalar(value) {
        if (Array.isArray(value) && value.length < 2) {
            return value.length ? value[0] : null;
        }
        return value;
    }    /**
     * Возвращает название типа поля
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField|String} format Формат поля
     * @return {String}
     */
    /**
     * Возвращает название типа поля
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField|String} format Формат поля
     * @return {String}
     */
    function getTypeName(format) {
        var type;
        if (typeof format === 'object') {
            type = format instanceof format_1.Field ? format.getType() : format.type;
        } else {
            type = format;
        }
        return ('' + type).toLowerCase();
    }    /**
     * Возвращает признак указания временной зоны для поля типа "Дата и время"
     * @param {WS.Data/Format/DateTimeField|WS.Data/Format/UniversalField} format Формат поля
     * @return {Number}
     */
    /**
     * Возвращает признак указания временной зоны для поля типа "Дата и время"
     * @param {WS.Data/Format/DateTimeField|WS.Data/Format/UniversalField} format Формат поля
     * @return {Number}
     */
    function isWithoutTimeZone(format) {
        if (!format) {
            return false;
        }
        return format instanceof format_1.DateTimeField ? format.isWithoutTimeZone() : format.meta && format.meta.withoutTimeZone;
    }    /**
     * Возвращает признак "Большие деньги"
     * @param {WS.Data/Format/MoneyField|WS.Data/Format/UniversalField} format Формат поля
     * @return {Boolean}
     */
    /**
     * Возвращает признак "Большие деньги"
     * @param {WS.Data/Format/MoneyField|WS.Data/Format/UniversalField} format Формат поля
     * @return {Boolean}
     */
    function isLargeMoney(format) {
        if (!format) {
            return false;
        }
        return format instanceof format_1.MoneyField ? format.isLarge() : format.meta && format.meta.large;
    }    /**
     * Возвращает точность для поля типа "Вещественное число"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {Number}
     */
    /**
     * Возвращает точность для поля типа "Вещественное число"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {Number}
     */
    function getPrecision(format) {
        if (!format) {
            return 0;
        }
        return (format.getPrecision ? format.getPrecision() : format.meta && format.meta.precision) || 0;
    }    /**
     * Возвращает тип элементов для поля типа "Массив"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {String}
     */
    /**
     * Возвращает тип элементов для поля типа "Массив"
     * @param {WS.Data/Format/Field|WS.Data/Format/UniversalField} format Формат поля
     * @return {String}
     */
    function getKind(format) {
        return (format.getKind ? format.getKind() : format.meta && format.meta.kind) || '';
    }    /**
     * Сериализует поле флагов
     * @param {WS.Data/Type/Flags} data
     * @return {Array.<Boolean>}
     */
    /**
     * Сериализует поле флагов
     * @param {WS.Data/Type/Flags} data
     * @return {Array.<Boolean>}
     */
    function serializeFlags(data) {
        var d = [];
        data.each(function (name) {
            d.push(data.get(name));
        });
        return d;
    }    /**
     * Конвертирует список записей в рекордсет
     * @param {WS.Data/Collection/List} list Список
     * @return {WS.Data/Collection/RecordSet}
     */
    /**
     * Конвертирует список записей в рекордсет
     * @param {WS.Data/Collection/List} list Список
     * @return {WS.Data/Collection/RecordSet}
     */
    function convertListToRecordSet(list) {
        var adapter = 'Data/type:adapter.Json', count = list.getCount(), record, i;
        for (i = 0; i < count; i++) {
            record = list.at(i);    //Check for WS.Data/Entity/Record
            //Check for WS.Data/Entity/Record
            if (record && record['[Data/_type/IObject]'] && record['[Data/_type/FormattableMixin]']) {
                adapter = record.getAdapter();
                break;
            }
        }
        var rs = util_1.di.create('Data/collection:RecordSet', { adapter: adapter });
        for (i = 0; i < count; i++) {
            rs.add(list.at(i));
        }
        return rs.getRawData(true);
    }
    var factory = {
        '[Data/_type/factory]': true,
        /**
         * @typedef {String} SimpleType
         * @variant integer Целое число
         * @variant real Действительное число
         * @variant double Действительное число с размером больше real
         * @variant boolean Логический
         * @variant money Деньги
         * @variant link Ссылка
         * @variant date Дата
         * @variant time Время
         * @variant datetime Дата-время
         * @variant timeinterval Временной интервал
         * @variant array Массив со значениями определенного типа
         */
        /**
         * Возвращает типизированное значение из исходного.
         * @param {*} value Исходное значение
         * @param {Function|SimpleType} Type Тип значения
         * @param {Object} [options] Опции
         * @return {*} Типизированное значение
         */
        cast: function (value, Type, options) {
            var _this = this;
            options = options || {};
            if (isNullable(Type, value, options)) {
                return value;
            }
            if (typeof Type === 'string') {
                Type = Type.toLowerCase();
                switch (Type) {
                case 'recordset':
                    Type = util_1.di.resolve(util_1.di.isRegistered('collection.$recordset') ? 'collection.$recordset' : 'Data/collection:RecordSet');
                    break;
                case 'record':
                    Type = util_1.di.resolve(util_1.di.isRegistered('entity.$model') ? 'entity.$model' : 'Data/type:Model');
                    break;
                case 'enum':
                    Type = util_1.di.resolve('Data/collection:Enum');
                    break;
                case 'flags':
                    Type = util_1.di.resolve('Data/collection:Flags');
                    break;
                case 'link':
                case 'integer':
                    return typeof value === 'number' ? value : isNaN(parseInt(value, 10)) ? null : parseInt(value, 10);
                case 'real':
                case 'double':
                    return typeof value === 'number' ? value : isNaN(parseFloat(value)) ? null : parseFloat(value);
                case 'boolean':
                    return !!value;
                case 'money':
                    if (!isLargeMoney(options.format)) {
                        var precision = getPrecision(options.format);
                        if (precision > 3) {
                            return renders.real(value, precision, false, true);
                        }
                    }
                    return value === undefined ? null : value;
                case 'date':
                case 'time':
                case 'datetime':
                    if (value instanceof Date) {
                        return value;
                    } else if (value === 'infinity') {
                        return Infinity;
                    } else if (value === '-infinity') {
                        return -Infinity;
                    }
                    value = fromSql('' + value);
                    if (value.setSQLSerializationMode) {
                        switch (Type) {
                        case 'date':
                            value.setSQLSerializationMode(Date.SQL_SERIALIZE_MODE_DATE);
                            break;
                        case 'time':
                            value.setSQLSerializationMode(Date.SQL_SERIALIZE_MODE_TIME);
                            break;
                        case 'datetime':
                            value.setSQLSerializationMode(Date.SQL_SERIALIZE_MODE_DATETIME);
                            break;
                        }
                    }
                    return value;
                case 'timeinterval':
                    if (value instanceof CoreTimeInterval) {
                        return value.toString();
                    }
                    return CoreTimeInterval.toString(value);
                case 'array':
                    var kind_1 = getKind(options.format);
                    if (!(value instanceof Array)) {
                        value = [value];
                    }
                    return value.map(function (val) {
                        return _this.cast(val, kind_1, options);
                    }, this);
                default:
                    return value;
                }
            }
            if (typeof Type === 'function') {
                if (value instanceof Type) {
                    return value;
                }
                if (Type.prototype['[Data/_type/IProducible]']) {
                    return Type.produceInstance(value, options);
                }    // @ts-ignore
                // @ts-ignore
                return new Type(value);
            }
            throw new TypeError('Unknown type ' + Type);
        },
        /**
         * Возвращет исходное значение из типизированного.
         * @param {*} value Типизированное значение
         * @param {Object} [options] Опции
         * @return {*} Исходное значение
         */
        serialize: function (value, options) {
            var _this = this;
            options = options || {};
            var type = getTypeName(options.format);
            if (isNullable(type, value, options)) {
                return value;
            }
            if (value && typeof value === 'object') {
                if (value['[Data/_type/FormattableMixin]']) {
                    value = value.getRawData(true);
                } else if (value['[Data/_collection/IFlags]']) {
                    value = serializeFlags(value);
                } else if (value['[Data/_collection/IEnum]']) {
                    value = value.get();
                } else if (value['[Data/_collection/IList]'] && type === 'recordset') {
                    value = convertListToRecordSet(value);
                } else if (coreInstance.instanceOfModule(value, 'Deprecated/Record')) {
                    throw new TypeError('Deprecated/Record can\'t be used with "Data"');
                } else if (coreInstance.instanceOfModule(value, 'Deprecated/RecordSet')) {
                    throw new TypeError('Deprecated/RecordSet can\'t be used with "Data"');
                } else if (coreInstance.instanceOfModule(value, 'Deprecated/Enum')) {
                    throw new TypeError('Deprecated/Enum can\'t be used with "Data"');
                }
            }
            switch (type) {
            case 'integer':
                value = toScalar(value);
                return typeof value === 'number' ? value : isNaN(value = value - 0) ? null : parseInt(value, 10);
            case 'real':
            case 'double':
                return toScalar(value);
            case 'link':
                return parseInt(value, 10);
            case 'money':
                value = toScalar(value);
                if (!isLargeMoney(options.format)) {
                    var precision = getPrecision(options.format);
                    if (precision > 3) {
                        return renders.real(value, precision, false, true);
                    }
                }
                return value;
            case 'date':
            case 'time':
            case 'datetime':
                value = toScalar(value);
                var serializeMode = toSql.MODE_DATE, withoutTimeZone = false;
                switch (type) {
                case 'datetime':
                    serializeMode = toSql.MODE_DATETIME;
                    withoutTimeZone = isWithoutTimeZone(options.format);
                    break;
                case 'time':
                    serializeMode = toSql.MODE_TIME;
                    break;
                }
                if (!value) {
                    value = fromSql('' + value);
                }
                if (value instanceof Date) {
                    value = toSql(value, serializeMode);
                    if (withoutTimeZone) {
                        value = value.replace(SQL_TIME_ZONE, '');
                    }
                } else if (value === Infinity) {
                    return 'infinity';
                } else if (value === -Infinity) {
                    return '-infinity';
                }
                return value;
            case 'timeinterval':
                value = toScalar(value);
                if (value instanceof CoreTimeInterval) {
                    return value.toString();
                }
                return CoreTimeInterval.toString(value);
            case 'array':
                var kind_2 = getKind(options.format);
                if (!(value instanceof Array)) {
                    value = [value];
                }
                return value.map(function (val) {
                    return _this.serialize(val, { format: kind_2 });
                }, this);
            default:
                return value;
            }
        }
    };
    exports.default = factory;
});