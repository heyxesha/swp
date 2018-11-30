/// <amd-module name="Data/_type/format/XmlField" />
/**
 * Формат поля для строки в формате XML.
 *
 * Создадим поле c типом "XML":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'xml'
 *    };
 * </pre>
 * @class WS.Data/Format/XmlField
 * @extends WS.Data/Format/Field
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/format/XmlField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field'
], function (require, exports, tslib_1, Field_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var XmlField = /** @class */
    function (_super) {
        tslib_1.__extends(XmlField, _super);    /** @lends WS.Data/Format/XmlField.prototype */
        /** @lends WS.Data/Format/XmlField.prototype */
        function XmlField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return XmlField;
    }(Field_1.default    /** @lends WS.Data/Format/XmlField.prototype */);
    /** @lends WS.Data/Format/XmlField.prototype */
    exports.default = XmlField;
    XmlField.prototype['[Data/_type/format/XmlField]'] = true;
    XmlField.prototype._moduleName = 'Data/type:format.XmlField';
    XmlField.prototype._typeName = 'Xml';
    XmlField.prototype._$defaultValue = '';
});