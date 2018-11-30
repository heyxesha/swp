/// <amd-module name="Data/_display/Search" />
/**
 * Проекция для режима поиска. Объединяет развернутые узлы в один элемент с "хлебной крошкой" внутри.
 * @class WS.Data/Display/Search
 * @extends WS.Data/Display/Tree
 * @public
 * @author Мальцев А.А.
 */
define('Data/_display/Search', [
    'require',
    'exports',
    'tslib',
    'Data/_display/Tree',
    'Data/_display/itemsStrategy/Search',
    'Data/util'
], function (require, exports, tslib_1, Tree_1, Search_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Search = /** @class */
    function (_super) {
        tslib_1.__extends(Search, _super);    /** @lends WS.Data/Display/Search.prototype */
        /** @lends WS.Data/Display/Search.prototype */
        function Search() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Search.prototype._createComposer = function () {
            var composer = _super.prototype._createComposer.call(this);
            composer.append(Search_1.default);
            return composer;
        };
        return Search;
    }(Tree_1.default    /** @lends WS.Data/Display/Search.prototype */);
    /** @lends WS.Data/Display/Search.prototype */
    exports.default = Search;
    Search.prototype._moduleName = 'Data/display:Search';
    Search.prototype['[Data/_display/Search]'] = true;
    util_1.di.register('Data/display:Search', Search);
});