/// <amd-module name="Data/_chain/factory" />
/**
 * Создает последовательную цепочку вызовов, обрабатывающих коллекции различных типов.
 *
 * Выберем из массива имена персонажей женского пола, отсортированные по имени:
 * <pre>
 * requirejs(['WS.Data/Chain'], function(chain) {
 *    chain([
 *       {name: 'Philip J. Fry', gender: 'M'},
 *       {name: 'Turanga Leela', gender: 'F'},
 *       {name: 'Professor Farnsworth', gender: 'M'},
 *       {name: 'Amy Wong', gender: 'F'},
 *       {name: 'Bender Bending Rodriguez', gender: 'R'}
 *    ]).filter(function(item) {
 *       return item.gender === 'F';
 *    }).map(function(item) {
 *       return item.name;
 *    }).sort(function(a, b) {
 *       return a > b;
 *    }).value();
 *    //['Amy Wong', 'Turanga Leela']
 * });
 * </pre>
 * Выберем из рекордсета персонажей женского пола, отсортированных по имени:
 * <pre>
 * requirejs([
 *    'WS.Data/Chain',
 *    'WS.Data/Collection/RecordSet'
 * ], function(
 *    chain,
 *    RecordSet
 * ) {
 *    chain(new RecordSet({rawData: [
 *       {name: 'Philip J. Fry', gender: 'M'},
 *       {name: 'Turanga Leela', gender: 'F'},
 *       {name: 'Professor Farnsworth', gender: 'M'},
 *       {name: 'Amy Wong', gender: 'F'},
 *       {name: 'Bender Bending Rodriguez', gender: 'R'}
 *    ]})).filter(function(item) {
 *       return item.get('gender') === 'F';
 *    }).sort(function(a, b) {
 *       return a.get('name') > b.get('name');
 *    }).value();
 *    //[Model(Amy Wong), Model(Turanga Leela)]
 * });
 * </pre>
 * Другие примеры смотрите в описании методов класса {@link WS.Data/Chain/Abstract}.
 *
 * @class WS.Data/Chain
 * @public
 * @author Мальцев А.А.
 */
define('Data/_chain/factory', [
    'require',
    'exports',
    'Data/util',
    'Data/_chain/Abstract',
    'Data/_chain/Arraywise',
    'Data/_chain/Objectwise',
    'Data/_chain/Enumerable',
    'Data/_chain/Concatenated',
    'Data/_chain/Counted',
    'Data/_chain/Filtered',
    'Data/_chain/Flattened',
    'Data/_chain/Grouped',
    'Data/_chain/Mapped',
    'Data/_chain/Reversed',
    'Data/_chain/Sliced',
    'Data/_chain/Sorted',
    'Data/_chain/Uniquely',
    'Data/_chain/Zipped'
], function (require, exports, util_1, Abstract_1, Arraywise_1, Objectwise_1, Enumerable_1, Concatenated_1, Counted_1, Filtered_1, Flattened_1, Grouped_1, Mapped_1, Reversed_1, Sliced_1, Sorted_1, Uniquely_1, Zipped_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    util_1.di.register('Data/chain:Abstract', Abstract_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Arraywise', Arraywise_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Concatenated', Concatenated_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Counted', Counted_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Enumerable', Enumerable_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Filtered', Filtered_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Flattened', Flattened_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Grouped', Grouped_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Mapped', Mapped_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Objectwise', Objectwise_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Reversed', Reversed_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Sliced', Sliced_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Sorted', Sorted_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Uniquely', Uniquely_1.default, { instantiate: false });
    util_1.di.register('Data/chain:Zipped', Zipped_1.default, { instantiate: false });
    function factory(source) {
        if (source instanceof Abstract_1.default) {
            return source;
        } else if (source && source['[Data/_collection/IEnumerable]']) {
            return new Enumerable_1.default(source);
        } else if (source instanceof Array) {
            return new Arraywise_1.default(source);
        } else if (source instanceof Object) {
            return new Objectwise_1.default(source);
        }
        throw new TypeError('Unsupported source type "' + source + '": only Array or Object are supported.');
    }
    exports.default = factory;
});