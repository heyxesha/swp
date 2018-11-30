/// <amd-module name="Data/_type/format/RecordSetField" />
/**
 * Формат поля для рекордсета.
 *
 * Создадим поле c типом "Рекордсет":
 * <pre>
 *    var field = {
 *       name: 'foo',
 *       type: 'recordset'
 *    };
 * </pre>
 * @class WS.Data/Format/RecordSetField
 * @extends WS.Data/Format/Field
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/format/RecordSetField', [
    'require',
    'exports',
    'tslib',
    'Data/_type/format/Field'
], function (require, exports, tslib_1, Field_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var RecordSetField = /** @class */
    function (_super) {
        tslib_1.__extends(RecordSetField, _super);    /** @lends WS.Data/Format/RecordSetField.prototype */
        /** @lends WS.Data/Format/RecordSetField.prototype */
        function RecordSetField() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RecordSetField;
    }(Field_1.default    /** @lends WS.Data/Format/RecordSetField.prototype */);
    /** @lends WS.Data/Format/RecordSetField.prototype */
    exports.default = RecordSetField;
    RecordSetField.prototype['[Data/_type/format/RecordSetField]'] = true;
    RecordSetField.prototype._moduleName = 'Data/type:format.RecordSetField';
    RecordSetField.prototype._typeName = 'RecordSet';
});