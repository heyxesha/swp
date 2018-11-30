/// <amd-module name="Data/_type/format/TimeField" />
/**
 * Формат поля для времени.
 *
 * Создадим поле c типом "Время":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'time'
 *    };
 * </pre>
 * @class WS.Data/Format/TimeField
 * @extends WS.Data/Format/Field
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/format/TimeField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field',
    'Core/helpers/Date/toSql'
], function (require, exports, tslib_1, Field_1, toSql) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var TimeField = /** @class */
    function (_super) {
        tslib_1.__extends(TimeField, _super);    /** @lends WS.Data/Format/TimeField.prototype */
        /** @lends WS.Data/Format/TimeField.prototype */
        function TimeField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }    //region Public methods
        //region Public methods
        TimeField.prototype.getDefaultValue = function () {
            if (this._$defaultValue instanceof Date) {
                return toSql(this._$defaultValue, toSql.MODE_TIME);
            }
            return this._$defaultValue;
        };
        return TimeField;
    }(Field_1.default    /** @lends WS.Data/Format/TimeField.prototype */);
    /** @lends WS.Data/Format/TimeField.prototype */
    exports.default = TimeField;
    TimeField.prototype['[Data/_type/format/TimeField]'] = true;
    TimeField.prototype._moduleName = 'Data/type:format.TimeField';
    TimeField.prototype._typeName = 'Time';
});