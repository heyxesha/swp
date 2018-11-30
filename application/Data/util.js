/// <amd-module name="Data/util" />
/**
 * Библиотека утилит.
 * @library Data/util
 * @includes di Data/_util/di
 * @includes object Data/_util/object
 * @includes logger Data/_util/logger
 * @includes mixin Data/_util/mixin
 * @includes protect Data/_util/protect
 * @public
 * @author Мальцев А.А.
 */
define('Data/util', [
    'require',
    'exports',
    'Data/_util/di',
    'Data/_util/logger',
    'Data/_util/object',
    'Data/_util/mixin',
    'Data/_util/protect'
], function (require, exports, di_1, logger_1, object_1, mixin_1, protect_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.di = di_1.default;
    exports.logger = logger_1.default;
    exports.object = object_1.default;
    exports.mixin = mixin_1.mixin;
    exports.applyMixins = mixin_1.applyMixins;
    exports.protect = protect_1.default;
});