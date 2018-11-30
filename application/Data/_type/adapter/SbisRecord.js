/// <amd-module name="Data/_type/adapter/SbisRecord" />
/**
 * Адаптер для записи таблицы данных в формате СБиС.
 * Работает с данными, представленными в виде объекта ({_type: 'record', d: [], s: []}), где
 * <ul>
 *    <li>d - значения полей записи;</li>
 *    <li>s - описание полей записи.</li>
 * </ul>
 *
 * Создадим адаптер для записи:
 * <pre>
 *    var adapter = new SbisRecord({
 *       _type: 'record',
 *       d: [1, 'Test'],
 *       s: [
 *          {n: 'id', t: 'Число целое'},
 *          {n: 'title', t: 'Строка'}
 *       ]
 *    });
 *    adapter.get('title');//'Test'
 * </pre>
 * @class WS.Data/Adapter/SbisRecord
 * @extends WS.Data/Entity/Abstract
 * @implements WS.Data/Adapter/IRecord
 * @implements WS.Data/Entity/ICloneable
 * @mixes WS.Data/Adapter/SbisFormatMixin
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/adapter/SbisRecord', [
    'require',
    'exports',
    'tslib',
    'Data/_type/Abstract',
    'Data/_type/adapter/SbisFormatMixin',
    'Data/util'
], function (require, exports, tslib_1, Abstract_1, SbisFormatMixin_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var SbisRecord = /** @class */
    function (_super) {
        tslib_1.__extends(SbisRecord, _super);    /**
         * Конструктор
         * @param {*} data Сырые данные
         */
        /**
         * Конструктор
         * @param {*} data Сырые данные
         */
        function SbisRecord(data) {
            var _this = _super.call(this, data) || this;
            SbisFormatMixin_1.default.constructor.call(_this, data);
            return _this;
        }
        SbisRecord.prototype.has = function (name) {
            return this._has(name);
        };
        SbisRecord.prototype.get = function (name) {
            var index = this._getFieldIndex(name);
            return index >= 0 ? this._cast(this._data.s[index], this._data.d[index]) : undefined;
        };
        SbisRecord.prototype.set = function (name, value) {
            var index = this._getFieldIndex(name);
            if (index < 0) {
                throw new ReferenceError(this._moduleName + '::set(): field "' + name + '" is not defined');
            }
            this._data.d[index] = this._uncast(this._data.s[index], value);
        };
        SbisRecord.prototype.clear = function () {
            this._touchData();
            SbisFormatMixin_1.default.clear.call(this);
            this._data.s.length = 0;
        };
        SbisRecord.prototype.clone = function (shallow) {
            //FIXME: shall share _data.s with recordset _data.s after clone to keep in touch. Probably no longer need this.
            return new SbisRecord(shallow ? this.getData() : this._cloneData(true));
        };    //endregion ICloneable
              //region SbisFormatMixin
        //endregion ICloneable
        //region SbisFormatMixin
        SbisRecord.prototype._buildD = function (at, value) {
            this._data.d.splice(at, 0, value);
        };
        SbisRecord.prototype._removeD = function (at) {
            this._data.d.splice(at, 1);
        };    //endregion SbisFormatMixin
              //region Protected methods
        //endregion SbisFormatMixin
        //region Protected methods
        SbisRecord.prototype._cast = function (format, value) {
            switch (format && format.t) {
            case 'Идентификатор':
                return value instanceof Array ? value[0] === null ? value[0] : value.join(this._castSeparator) : value;
            }
            return value;
        };
        SbisRecord.prototype._uncast = function (format, value) {
            switch (format && format.t) {
            case 'Идентификатор':
                if (value instanceof Array) {
                    return value;
                }
                return typeof value === 'string' ? value.split(this._castSeparator) : [value];
            }
            return value;
        };
        return SbisRecord;
    }(util_1.mixin(Abstract_1.default, SbisFormatMixin_1.default));
    exports.default = SbisRecord;
    SbisRecord.prototype['[Data/_type/adapter/SbisRecord]'] = true;    // @ts-ignore
    // @ts-ignore
    SbisRecord.prototype['[Data/_type/adapter/IRecord]'] = true;    // @ts-ignore
    // @ts-ignore
    SbisRecord.prototype['[Data/_type/ICloneable]'] = true;
    SbisRecord.prototype._type = 'record';
    SbisRecord.prototype._castSeparator = ',';    //FIXME: backward compatibility for check via Core/core-instance::instanceOfMixin()
    //FIXME: backward compatibility for check via Core/core-instance::instanceOfMixin()
    SbisRecord.prototype['[WS.Data/Entity/ICloneable]'] = true;
});