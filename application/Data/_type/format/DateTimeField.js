/// <amd-module name="Data/_type/format/DateTimeField" />
/**
 * Формат поля для даты и времени.
 *
 * Создадим поле c типом "Дата и время":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'dateTime'
 *    };
 * </pre>
 * @class WS.Data/Format/DateTimeField
 * @extends WS.Data/Format/Field
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/format/DateTimeField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field'
], function (require, exports, tslib_1, Field_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var DateTimeField = /** @class */
    function (_super) {
        tslib_1.__extends(DateTimeField, _super);    /** @lends WS.Data/Format/DateTimeField.prototype */
        /** @lends WS.Data/Format/DateTimeField.prototype */
        function DateTimeField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }    //region Public methods
             /**
         * Возвращает признак указания временной зоны
         * @return {Boolean}
         */
        //region Public methods
        /**
         * Возвращает признак указания временной зоны
         * @return {Boolean}
         */
        DateTimeField.prototype.isWithoutTimeZone = function () {
            return this._$withoutTimeZone;
        };
        return DateTimeField;
    }(Field_1.default    /** @lends WS.Data/Format/DateTimeField.prototype */);
    /** @lends WS.Data/Format/DateTimeField.prototype */
    exports.default = DateTimeField;
    DateTimeField.prototype['[Data/_type/format/DateTimeField]'] = true;
    DateTimeField.prototype._moduleName = 'Data/type:format.DateTimeField';
    DateTimeField.prototype._typeName = 'DateTime';
    DateTimeField.prototype._$withoutTimeZone = false;
});