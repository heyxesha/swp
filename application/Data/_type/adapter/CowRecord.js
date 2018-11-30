/// <amd-module name="Data/_type/adapter/CowRecord" />
/**
 * Адаптер записи таблицы для работы в режиме Copy-on-write.
 * @class WS.Data/Adapter/CowRecord
 * @extends WS.Data/Entity/Abstract
 * @implements WS.Data/Adapter/IRecord
 * @implements WS.Data/Adapter/IDecorator
 * @author Мальцев А.А.
 */
define('Data/_type/adapter/CowRecord', [
    'require',
    'exports',
    'tslib',
    'Data/_type/Abstract',
    'Data/util'
], function (require, exports, tslib_1, Abstract_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var CowRecord = /** @class */
    function (_super) {
        tslib_1.__extends(CowRecord, _super);    /**
         * Конструктор
         * @param {*} data Сырые данные
         * @param {WS.Data/Adapter/IAdapter} original Оригинальный адаптер
         * @param {Function} [writeCallback] Ф-я обратного вызова при событии записи
         */
        /**
         * Конструктор
         * @param {*} data Сырые данные
         * @param {WS.Data/Adapter/IAdapter} original Оригинальный адаптер
         * @param {Function} [writeCallback] Ф-я обратного вызова при событии записи
         */
        function CowRecord(data, original, writeCallback) {
            var _this = _super.call(this) || this;
            _this._original = original;
            _this._originalRecord = original.forRecord(data);
            if (writeCallback) {
                _this._writeCallback = writeCallback;
            }
            return _this;
        }
        CowRecord.prototype.has = function (name) {
            return this._originalRecord.has(name);
        };
        CowRecord.prototype.get = function (name) {
            return this._originalRecord.get(name);
        };
        CowRecord.prototype.set = function (name, value) {
            this._copy();
            return this._originalRecord.set(name, value);
        };
        CowRecord.prototype.clear = function () {
            this._copy();
            return this._originalRecord.clear();
        };
        CowRecord.prototype.getData = function () {
            return this._originalRecord.getData();
        };
        CowRecord.prototype.getFields = function () {
            return this._originalRecord.getFields();
        };
        CowRecord.prototype.getFormat = function (name) {
            return this._originalRecord.getFormat(name);
        };
        CowRecord.prototype.getSharedFormat = function (name) {
            return this._originalRecord.getSharedFormat(name);
        };
        CowRecord.prototype.addField = function (format, at) {
            this._copy();
            return this._originalRecord.addField(format, at);
        };
        CowRecord.prototype.removeField = function (name) {
            this._copy();
            return this._originalRecord.removeField(name);
        };
        CowRecord.prototype.removeFieldAt = function (index) {
            this._copy();
            return this._originalRecord.removeFieldAt(index);
        };
        CowRecord.prototype.getOriginal = function () {
            return this._originalRecord;
        };    //endregion WS.Data/Adapter/IDecorator
              //region Protected methods
        //endregion WS.Data/Adapter/IDecorator
        //region Protected methods
        CowRecord.prototype._copy = function () {
            if (!this._copied) {
                if (this._originalRecord['[Data/_type/ICloneable]']) {
                    // @ts-ignore
                    this._originalRecord = this._originalRecord.clone();
                } else {
                    this._originalRecord = this._original.forRecord(util_1.object.clonePlain(this._originalRecord.getData()));
                }
                this._copied = true;
                if (this._writeCallback) {
                    this._writeCallback();
                    this._writeCallback = null;
                }
            }
        };
        return CowRecord;
    }(Abstract_1.default);
    exports.default = CowRecord;
    CowRecord.prototype['[Data/_type/adapter/CowRecord]'] = true;    // @ts-ignore
    // @ts-ignore
    CowRecord.prototype['[Data/_type/adapter/IRecord]'] = true;    // @ts-ignore
    // @ts-ignore
    CowRecord.prototype['[Data/_type/adapter/IDecorator]'] = true;
    CowRecord.prototype._original = null;
    CowRecord.prototype._originalRecord = null;
    CowRecord.prototype._writeCallback = null;
    CowRecord.prototype._copied = false;
});