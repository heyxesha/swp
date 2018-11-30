/// <amd-module name="Data/_type/relation" />
/**
 * Relations library.
 * @library Data/_type/relation
 * @includes Hierarchy Data/_type/relation/Hierarchy
 * @includes IReceiver Data/_type/relation/IReceiver
 * @author Мальцев А.А.
 */
define('Data/_type/relation', [
    'require',
    'exports',
    'Data/_type/relation/Hierarchy',
    'Data/_type/relation/IReceiver'
], function (require, exports, Hierarchy_1, IReceiver_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.Hierarchy = Hierarchy_1.default;
    exports.IReceiver = IReceiver_1.default;
});