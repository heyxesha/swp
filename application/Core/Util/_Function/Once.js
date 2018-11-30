define('Core/Util/_Function/Once', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * Модуль, в котором описана функция <b>once(original)</b>.
     *
     * Метод обертки функции: вызовет функцию только один раз.
     * Повторные вызовы результирующей функции будут возвращать результат первого вызова.
     *
     * <h2>Параметры функции</h2>
     * <ul>
     *     <li><b>original</b> {Function} - исходная функция, вызов которой нужно выполнить один раз.</li>
     * </ul>
     *
     * <h2>Возвращает</h2>
     * {Function} Результирующая функция.
     *
     * <h2>Пример использования</h2>
     * <pre>
     * require(['Core/helpers/Function/once'], function(once) {
     *    var foo = function(bar) {
     *          console.log(`foo: ${bar}`);
     *          return 'foo+' + bar;
     *       },
     *       fooDecorator = once(foo);
     *
     *    console.log(fooDecorator('baz'));//foo: baz, foo+baz
     *    console.log(fooDecorator('baz'));//foo+baz
     * });
     * </pre>
     *
     * @class Core/helpers/Function/once
     * @public
     * @author Мальцев А.А.
     */
    /**
     * Модуль, в котором описана функция <b>once(original)</b>.
     *
     * Метод обертки функции: вызовет функцию только один раз.
     * Повторные вызовы результирующей функции будут возвращать результат первого вызова.
     *
     * <h2>Параметры функции</h2>
     * <ul>
     *     <li><b>original</b> {Function} - исходная функция, вызов которой нужно выполнить один раз.</li>
     * </ul>
     *
     * <h2>Возвращает</h2>
     * {Function} Результирующая функция.
     *
     * <h2>Пример использования</h2>
     * <pre>
     * require(['Core/helpers/Function/once'], function(once) {
     *    var foo = function(bar) {
     *          console.log(`foo: ${bar}`);
     *          return 'foo+' + bar;
     *       },
     *       fooDecorator = once(foo);
     *
     *    console.log(fooDecorator('baz'));//foo: baz, foo+baz
     *    console.log(fooDecorator('baz'));//foo+baz
     * });
     * </pre>
     *
     * @class Core/helpers/Function/once
     * @public
     * @author Мальцев А.А.
     */
    function once(original) {
        if (arguments.length < 1) {
            original = this;
        }
        var called = false, result;
        return function () {
            if (!called) {
                result = original.apply(this, arguments);
                called = true;
            } else {
                original = null;
            }
            return result;
        };
    }
    exports.default = once;
});