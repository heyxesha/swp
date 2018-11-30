/// <amd-module name="Data/_collection/factory" />
/**
 * Factories library.
 * @library Data/_collection/factory
 * @includes Factory Data/_collection/factory/list
 * @includes Format Data/_collection/factory/recordSet
 * @author Мальцев А.А.
 */
define('Data/_collection/factory', [
    'require',
    'exports',
    'Data/_collection/factory/list',
    'Data/_collection/factory/recordSet'
], function (require, exports, list_1, recordSet_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.list = list_1.default;
    exports.recordSet = recordSet_1.default;
});