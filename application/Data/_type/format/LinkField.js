/// <amd-module name="Data/_type/format/LinkField" />
/**
 * Формат поля "Связь".
 *
 * Создадим поле c типом "Связь":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'link'
 *    };
 * </pre>
 * @class WS.Data/Format/LinkField
 * @extends WS.Data/Format/Field
 * @deprecated Модуль будет удален в 3.18.10
 * @author Мальцев А.А.
 */
define('Data/_type/format/LinkField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field'
], function (require, exports, tslib_1, Field_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var LinkField = /** @class */
    function (_super) {
        tslib_1.__extends(LinkField, _super);    /** @lends WS.Data/Format/LinkField.prototype */
        /** @lends WS.Data/Format/LinkField.prototype */
        function LinkField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LinkField;
    }(Field_1.default    /** @lends WS.Data/Format/LinkField.prototype */);
    /** @lends WS.Data/Format/LinkField.prototype */
    exports.default = LinkField;
    LinkField.prototype['[Data/_type/format/LinkField]'] = true;
    LinkField.prototype._moduleName = 'Data/type:format.LinkField';
    LinkField.prototype._typeName = 'Link';
    LinkField.prototype._$defaultValue = 0;
});