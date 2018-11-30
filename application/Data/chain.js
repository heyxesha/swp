/// <amd-module name="Data/chain" />
/**
 * Библиотека последовательных вычислений, обрабатывающих коллекции различных типов.
 * @library Data/chain
 * @includes factory Data/_chain/factory
 * @includes Abstract Data/_chain/Abstract
 * @public
 * @author Мальцев А.А.
 */
define('Data/chain', [
    'require',
    'exports',
    'Data/_chain/factory',
    'Data/_chain/Abstract',
    'Data/_chain/Objectwise'
], function (require, exports, factory_1, Abstract_1, Objectwise_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.factory = factory_1.default;
    exports.Abstract = Abstract_1.default;
    exports.Objectwise = Objectwise_1.default;
});