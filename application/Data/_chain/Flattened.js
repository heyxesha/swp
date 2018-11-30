/// <amd-module name="Data/_chain/Flattened" />
/**
 * Разворачивающее звено цепочки.
 * @class WS.Data/Chain/Flattened
 * @extends WS.Data/Chain/Abstract
 * @public
 * @author Мальцев А.А.
 */
define('Data/_chain/Flattened', [
    'require',
    'exports',
    'tslib',
    'Data/_chain/Abstract',
    'Data/_chain/FlattenedEnumerator'
], function (require, exports, tslib_1, Abstract_1, FlattenedEnumerator_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Flattened = /** @class */
    function (_super) {
        tslib_1.__extends(Flattened, _super);    /** @lends WS.Data/Chain/Flattened.prototype */
        /** @lends WS.Data/Chain/Flattened.prototype */
        function Flattened() {
            return _super !== null && _super.apply(this, arguments) || this;
        }    // region Data/_collection/IEnumerable
        // region Data/_collection/IEnumerable
        Flattened.prototype.getEnumerator = function () {
            return new FlattenedEnumerator_1.default(this._previous);
        };
        return Flattened;
    }(Abstract_1.default);
    exports.default = Flattened;
    Flattened.prototype['[Data/_chain/Flattened]'] = true;
});