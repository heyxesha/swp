/// <amd-module name="Data/_type/format/StringField" />
/**
 * Формат поля для строк.
 *
 * Создадим поле c типом "Строка":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'string'
 *    };
 * </pre>
 * @class WS.Data/Format/StringField
 * @extends WS.Data/Format/Field
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/format/StringField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field'
], function (require, exports, tslib_1, Field_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var StringField = /** @class */
    function (_super) {
        tslib_1.__extends(StringField, _super);    /** @lends WS.Data/Format/StringField.prototype */
        /** @lends WS.Data/Format/StringField.prototype */
        function StringField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StringField;
    }(Field_1.default    /** @lends WS.Data/Format/StringField.prototype */);
    /** @lends WS.Data/Format/StringField.prototype */
    exports.default = StringField;
    StringField.prototype['[Data/_type/format/StringField]'] = true;
    StringField.prototype._moduleName = 'Data/type:format.StringField';
    StringField.prototype._typeName = 'String';
});