/// <amd-module name="Data/_collection/IBind" />
/**
 * Интерфейс привязки к коллекции.
 * Позволяет узнавать об изменения, происходящих с элементами коллекции.
 * @interface WS.Data/Collection/IBind
 * @public
 * @author Мальцев А.А.
 */
define('Data/_collection/IBind', [
    'require',
    'exports'
], function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var IBind = /** @lends WS.Data/Collection/IBind.prototype */
    {
        '[Data/_collection/IBind]': true,
        /**
         * @const {String} Изменение коллекции: добавлены элементы
         */
        ACTION_ADD: 'a',
        /**
         * @const {String} Изменение коллекции: удалены элементы
         */
        ACTION_REMOVE: 'rm',
        /**
         * @const {String} Изменение коллекции: изменены элементы
         */
        ACTION_CHANGE: 'ch',
        /**
         * @const {String} Изменение коллекции: заменены элементы
         */
        ACTION_REPLACE: 'rp',
        /**
         * @const {String} Изменение коллекции: перемещены элементы
         */
        ACTION_MOVE: 'm',
        /**
         * @const {String} Изменение коллекции: значительное изменение
         */
        ACTION_RESET: 'rs'    /**
         * @typedef {String} ChangeAction
         * @variant a Добавлены элементы
         * @variant rm Удалены элементы
         * @variant ch Изменены элементы
         * @variant rp Заменены элементы
         * @variant m Перемещены элементы
         * @variant rs Значительное изменение
         */
                              /**
         * @event onCollectionChange После изменения коллекции
         * @param {Core/EventObject} event Дескриптор события.
         * @param {ChangeAction} action Действие, приведшее к изменению.
         * @param {Array} newItems Новые элементы коллекции.
         * @param {Number} newItemsIndex Индекс, в котором появились новые элементы.
         * @param {Array} oldItems Удаленные элементы коллекции.
         * @param {Number} oldItemsIndex Индекс, в котором удалены элементы.
         * @example
         * <pre>
         * define([
         *    'WS.Data/Collection/ObservableList', 'WS.Data/Collection/IBind'
         * ], function(ObservableList, IBindCollection) {
         *    var list = new ObservableList({
         *       items: [1, 2, 3]
         *    });
         *
         *    list.subscribe(
         *       'onCollectionChange',
         *      function(eventObject, action, newItems, newItemsIndex, oldItems, oldItemsIndex) {
         *          if (action == IBindCollection.ACTION_REMOVE){
         *             console.log(oldItems);//[1]
         *             console.log(oldItemsIndex);//0
         *          }
         *       }
         *    );
         *
         *    list.removeAt(0);
         * });
         * </pre>
         */
                              /**
         * @event onCollectionItemChange После изменения элемента коллекции
         * @param {Core/EventObject} event Дескриптор события.
         * @param {*} item Измененный элемент коллекции.
         * @param {Number} index Индекс измененного элемента.
         * @param {Object} [properties] Изменившиеся свойства
         * @example
         * Отследим изменение свойства title:
         * <pre>
         *    var records = [new Record(), new Record(), new Record()],
         *       list = new ObservableList({
         *          items: records
         *       });
         *
         *    list.subscribe('onCollectionItemChange', function(eventObject, item, index, properties) {
         *       console.log(item === records[2]);//true
         *       console.log(index);//2
         *       console.log('title' in properties);//true
         *    });
         *
         *    records[2].set('title', 'test');
         * </pre>
         */
    };
    /**
         * @typedef {String} ChangeAction
         * @variant a Добавлены элементы
         * @variant rm Удалены элементы
         * @variant ch Изменены элементы
         * @variant rp Заменены элементы
         * @variant m Перемещены элементы
         * @variant rs Значительное изменение
         */
    /**
         * @event onCollectionChange После изменения коллекции
         * @param {Core/EventObject} event Дескриптор события.
         * @param {ChangeAction} action Действие, приведшее к изменению.
         * @param {Array} newItems Новые элементы коллекции.
         * @param {Number} newItemsIndex Индекс, в котором появились новые элементы.
         * @param {Array} oldItems Удаленные элементы коллекции.
         * @param {Number} oldItemsIndex Индекс, в котором удалены элементы.
         * @example
         * <pre>
         * define([
         *    'WS.Data/Collection/ObservableList', 'WS.Data/Collection/IBind'
         * ], function(ObservableList, IBindCollection) {
         *    var list = new ObservableList({
         *       items: [1, 2, 3]
         *    });
         *
         *    list.subscribe(
         *       'onCollectionChange',
         *      function(eventObject, action, newItems, newItemsIndex, oldItems, oldItemsIndex) {
         *          if (action == IBindCollection.ACTION_REMOVE){
         *             console.log(oldItems);//[1]
         *             console.log(oldItemsIndex);//0
         *          }
         *       }
         *    );
         *
         *    list.removeAt(0);
         * });
         * </pre>
         */
    /**
         * @event onCollectionItemChange После изменения элемента коллекции
         * @param {Core/EventObject} event Дескриптор события.
         * @param {*} item Измененный элемент коллекции.
         * @param {Number} index Индекс измененного элемента.
         * @param {Object} [properties] Изменившиеся свойства
         * @example
         * Отследим изменение свойства title:
         * <pre>
         *    var records = [new Record(), new Record(), new Record()],
         *       list = new ObservableList({
         *          items: records
         *       });
         *
         *    list.subscribe('onCollectionItemChange', function(eventObject, item, index, properties) {
         *       console.log(item === records[2]);//true
         *       console.log(index);//2
         *       console.log('title' in properties);//true
         *    });
         *
         *    records[2].set('title', 'test');
         * </pre>
         */
    exports.default = IBind;
});