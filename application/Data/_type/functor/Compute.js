/// <amd-module name="Data/_type/functor/Compute" />
/**
 * Функтор, хранящий информацию о свойствах, от значения которых зависит результат вычислений.
 * Создадим и выполним функтор, вычисляющий 20% налог на заказ в магазине:
 * <pre>
 *    requirejs(['WS.Data/Functor/Compute'], function(ComputeFunctor) {
 *       var getTax = new ComputeFunctor(function(totals, percent) {
 *             return totals.amount * percent / 100;
 *          }, ['amount']),
 *          tax;
 *
 *       tax = getTax({
 *          count: 5,
 *          amount: 250
 *       }, 20);
 *       console.log(tax);//50
 *       console.log(getTax.properties);//['amount']
 *    });
 * </pre>
 * @class WS.Data/Functor/Compute
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/functor/Compute', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * Конструктор
     * @param {Function} fn Функция, производящая вычисления
     * @param {Array.<String>} [properties] Свойства, от которых зависит результат вычисления
     * @return {Function}
     * @protected
     */
    /**
     * Конструктор
     * @param {Function} fn Функция, производящая вычисления
     * @param {Array.<String>} [properties] Свойства, от которых зависит результат вычисления
     * @return {Function}
     * @protected
     */
    var Compute = /** @class */
    function () {
        function Compute(fn, properties) {
            properties = properties || [];
            if (!(fn instanceof Function)) {
                throw new TypeError('Argument "fn" be an instance of Function');
            }
            if (!(properties instanceof Array)) {
                throw new TypeError('Argument "properties" be an instance of Array');
            }
            Object.defineProperty(fn, 'functor', {
                get: function () {
                    return Compute;
                }
            });
            Object.defineProperty(fn, 'properties', {
                get: function () {
                    return properties;
                }
            });    // @ts-ignore
            // @ts-ignore
            return fn;
        }
        Compute.isFunctor = function (fn) {
            return fn && fn.functor === Compute;
        };
        return Compute;
    }();
    exports.default = Compute;
});