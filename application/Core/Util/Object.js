// <amd-module name="Core/Util/Object" />
define('Core/Util/Object', [
    'require',
    'exports',
    'Core/Util/_Object/Merge',
    'Core/Util/_Object/IsEmpty'
], function (require, exports, Merge_1, IsEmpty_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.merge = Merge_1.default;
    exports.isEmpty = IsEmpty_1.default;
});