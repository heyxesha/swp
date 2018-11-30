/// <amd-module name="Data/_chain/Concatenated" />
/**
 * Объединяющее звено цепочки.
 * @class WS.Data/Chain/Concatenated
 * @extends WS.Data/Chain/Abstract
 * @public
 * @author Мальцев А.А.
 */
define('Data/_chain/Concatenated', [
    'require',
    'exports',
    'tslib',
    'Data/_chain/Abstract',
    'Data/_chain/ConcatenatedEnumerator'
], function (require, exports, tslib_1, Abstract_1, ConcatenatedEnumerator_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Concatenated = /** @class */
    function (_super) {
        tslib_1.__extends(Concatenated, _super);    /** @lends WS.Data/Chain/Concatenated.prototype */
                                                    /**
         * Конструктор объединяющего звена цепочки.
         * @param {WS.Data/Chain/Abstract} source Предыдущее звено.
         * @param {Array.<Array>|Array.<WS.Data/Collection/IEnumerable>} items Коллекции для объединения.
         */
        /** @lends WS.Data/Chain/Concatenated.prototype */
        /**
         * Конструктор объединяющего звена цепочки.
         * @param {WS.Data/Chain/Abstract} source Предыдущее звено.
         * @param {Array.<Array>|Array.<WS.Data/Collection/IEnumerable>} items Коллекции для объединения.
         */
        function Concatenated(source, items) {
            var _this = _super.call(this, source) || this;
            _this._items = items;
            return _this;
        }
        Concatenated.prototype.destroy = function () {
            this._items = null;
            _super.prototype.destroy.call(this);
        };    // region Data/_collection/IEnumerable
        // region Data/_collection/IEnumerable
        Concatenated.prototype.getEnumerator = function () {
            return new ConcatenatedEnumerator_1.default(this._previous, this._items);
        };
        return Concatenated;
    }(Abstract_1.default);
    exports.default = Concatenated;
    Concatenated.prototype['[Data/_chain/Concatenated]'] = true;    // @ts-ignore
    // @ts-ignore
    Concatenated.prototype._items = null;
    Object.defineProperty(Concatenated.prototype, 'shouldSaveIndices', { value: false });
});