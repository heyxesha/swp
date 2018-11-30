define('Core/Util/_Array/IndexOf', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function indexOf(arr, e)
        /* , from */
        {
            if (!(arr instanceof Array)) {
                throw new TypeError('Incorrect type of the first arguments. Array expected');
            }
            if ([].indexOf) {
                return arr.indexOf(e, arguments[2]);
            }
            var len = arr.length;
            var from = Number(arguments[2]) || 0;
            from = from < 0 ? Math.ceil(from) : Math.floor(from);
            if (from < 0) {
                from += len;
            }
            for (; from < len; from++) {
                if (arr[from] === e) {
                    return from;
                }
            }
            return -1;
        }
    exports.default = indexOf;
});