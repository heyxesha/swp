/// <amd-module name="Data/_chain/Counted" />
/**
 * Агрегирующее звено цепочки, подсчитывающие количество элементов, объединенных по какому-то принципу.
 * @class WS.Data/Chain/Counted
 * @extends WS.Data/Chain/Abstract
 * @public
 * @author Мальцев А.А.
 */
define('Data/_chain/Counted', [
    'require',
    'exports',
    'tslib',
    'Data/_chain/Abstract',
    'Data/collection',
    'Data/shim'
], function (require, exports, tslib_1, Abstract_1, collection_1, shim_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Counted = /** @class */
    function (_super) {
        tslib_1.__extends(Counted, _super);    /** @lends WS.Data/Chain/Counted.prototype */
                                               /**
         * Конструктор агрегирующего звена цепочки, подсчитывающего количество элементов, объединенных по какому-то принципу.
         * @param {WS.Data/Chain/Abstract} source Предыдущее звено.
         * @param {String|function(*): String} key Поле агрегации или функция агрегации для каждого элемента.
         */
        /** @lends WS.Data/Chain/Counted.prototype */
        /**
         * Конструктор агрегирующего звена цепочки, подсчитывающего количество элементов, объединенных по какому-то принципу.
         * @param {WS.Data/Chain/Abstract} source Предыдущее звено.
         * @param {String|function(*): String} key Поле агрегации или функция агрегации для каждого элемента.
         */
        function Counted(source, key) {
            var _this = _super.call(this, source) || this;
            _this._key = key;
            return _this;
        }
        Counted.prototype.destroy = function () {
            this._key = null;
            _super.prototype.destroy.call(this);
        };    // region WS.Data/Collection/IEnumerable
        // region WS.Data/Collection/IEnumerable
        Counted.prototype.getEnumerator = function () {
            var toKey = Abstract_1.default.propertyMapper(this._key);
            return new collection_1.MapEnumerator(this._previous.reduce(function (memo, item, index) {
                var key = toKey(item, index);
                var count = memo.has(key) ? memo.get(key) : 0;
                memo.set(key, count + 1);
                return memo;
            }, new shim_1.Map()));
        };
        return Counted;
    }(Abstract_1.default);
    exports.default = Counted;
    Counted.prototype['[Data/_chain/Counted]'] = true;    // @ts-ignore
    // @ts-ignore
    Counted.prototype._key = null;
});