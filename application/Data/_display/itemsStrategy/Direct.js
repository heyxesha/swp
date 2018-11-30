/// <amd-module name="Data/_display/itemsStrategy/Direct" />
/**
 * Стратегия получения элементов проекции напрямую по коллекции
 * @class WS.Data/Display/ItemsStrategy/Direct
 * @extends WS.Data/Display/ItemsStrategy/Abstract
 * @author Мальцев А.А.
 */
define('Data/_display/itemsStrategy/Direct', [
    'require',
    'exports',
    'tslib',
    'Data/_display/itemsStrategy/AbstractStrategy',
    'Data/_display/CollectionItem',
    'Data/util',
    'Data/shim'
], function (require, exports, tslib_1, AbstractStrategy_1, CollectionItem_1, util_1, shim_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Direct = /** @class */
    function (_super) {
        tslib_1.__extends(Direct, _super);    /** @lends WS.Data/Display/ItemsStrategy/Direct.prototype */
                                              /**
         * @typedef {Object} Options
         * @property {WS.Data/Display/Collection} display Проекция
         * @property {Boolean} unique Признак обеспечения уникальности элементов
         * @property {String} idProperty Название свойства элемента коллекции, содержащего его уникальный идентификатор
         */
        /** @lends WS.Data/Display/ItemsStrategy/Direct.prototype */
        /**
         * @typedef {Object} Options
         * @property {WS.Data/Display/Collection} display Проекция
         * @property {Boolean} unique Признак обеспечения уникальности элементов
         * @property {String} idProperty Название свойства элемента коллекции, содержащего его уникальный идентификатор
         */
        function Direct(options) {
            return _super.call(this, options) || this;
        }
        Object.defineProperty(Direct.prototype, 'unique', {
            /**
             * Устанавливает признак обеспечения уникальности элементов
             */
            set: function (value) {
                this._options.unique = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Direct.prototype, 'count', {
            //region IItemsStrategy
            get: function () {
                return this._getItemsOrder().length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Direct.prototype, 'items', {
            get: function () {
                var items = this._getItems();
                var itemsOrder = this._getItemsOrder();
                return itemsOrder.map(function (position) {
                    return items[position];
                });
            },
            enumerable: true,
            configurable: true
        });
        Direct.prototype.at = function (index) {
            var items = this._getItems();
            var itemsOrder = this._getItemsOrder();
            var position = itemsOrder[index];
            if (position === undefined) {
                throw new ReferenceError('Display index ' + index + ' is out of bounds.');
            }
            return items[position];
        };
        Direct.prototype.splice = function (start, deleteCount, added) {
            var _this = this;
            var _a;
            added = added || [];
            var reallyAdded = added.map(function (contents) {
                return contents instanceof CollectionItem_1.default ? contents : _this._createItem(contents);
            });
            var result = (_a = this._getItems()).splice.apply(_a, [
                start,
                deleteCount
            ].concat(reallyAdded));
            this._itemsOrder = null;
            return result;
        };
        Direct.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._itemsOrder = null;
        };
        Direct.prototype.invalidate = function () {
            _super.prototype.invalidate.call(this);
            this._itemsOrder = null;
        };
        Direct.prototype.getDisplayIndex = function (index) {
            var itemsOrder = this._getItemsOrder();
            var itemIndex = itemsOrder.indexOf(index);
            return itemIndex === -1 ? itemsOrder.length : itemIndex;
        };
        Direct.prototype.getCollectionIndex = function (index) {
            var itemsOrder = this._getItemsOrder();
            var itemIndex = itemsOrder[index];
            return itemIndex === undefined ? -1 : itemIndex;
        };    //endregion
              //region SerializableMixin
        //endregion
        //region SerializableMixin
        Direct.prototype._getSerializableState = function (state) {
            state = _super.prototype._getSerializableState.call(this, state);
            state._itemsOrder = this._itemsOrder;
            return state;
        };
        Direct.prototype._setSerializableState = function (state) {
            var fromSuper = _super.prototype._setSerializableState.call(this, state);
            return function () {
                this._itemsOrder = state._itemsOrder;
                fromSuper.call(this);
            };
        };    //endregion
              //region Protected
        //endregion
        //region Protected
        Direct.prototype._initItems = function () {
            _super.prototype._initItems.call(this);
            var items = this._items;
            var sourceItems = this._getSourceItems();
            var count = items.length;
            for (var index = 0; index < count; index++) {
                items[index] = this._createItem(sourceItems[index]);
            }
        };    /**
         * Возвращает соответствие индексов в стратегии оригинальным индексам
         * @protected
         * @return {Array.<Number>}
         */
        /**
         * Возвращает соответствие индексов в стратегии оригинальным индексам
         * @protected
         * @return {Array.<Number>}
         */
        Direct.prototype._getItemsOrder = function () {
            if (!this._itemsOrder) {
                this._itemsOrder = this._createItemsOrder();
            }
            return this._itemsOrder;
        };
        Direct.prototype._createItemsOrder = function () {
            return Direct.sortItems(this._getItems(), {
                idProperty: this._options.idProperty,
                unique: this._options.unique
            });
        };    //endregion
              //region Statics
              /**
         * Создает индекс сортировки в том же порядке, что и коллекция
         * @param {Array.<WS.Data/Display/CollectionItem>} items Элементы проекции.
         * @param {Array.<Number>} current Текущий индекс сортировки
         * @param {Object} options Опции
         * @return {Array.<Number>}
         */
        //endregion
        //region Statics
        /**
         * Создает индекс сортировки в том же порядке, что и коллекция
         * @param {Array.<WS.Data/Display/CollectionItem>} items Элементы проекции.
         * @param {Array.<Number>} current Текущий индекс сортировки
         * @param {Object} options Опции
         * @return {Array.<Number>}
         */
        Direct.sortItems = function (items, options) {
            var idProperty = options.idProperty;
            if (!options.unique || !idProperty) {
                return items.map(function (item, index) {
                    return index;
                });
            }
            var processed = new shim_1.Set();
            var result = [];
            var itemId;
            items.forEach(function (item, index) {
                itemId = util_1.object.getPropertyValue(item.getContents(), idProperty);
                if (processed.has(itemId)) {
                    return;
                }
                processed.add(itemId);
                result.push(index);
            });
            return result;
        };
        return Direct;
    }(AbstractStrategy_1.default    /** @lends WS.Data/Display/ItemsStrategy/Direct.prototype */);
    /** @lends WS.Data/Display/ItemsStrategy/Direct.prototype */
    exports.default = Direct;
    Direct.prototype._moduleName = 'Data/display:itemsStrategy.Direct';
    Direct.prototype['[Data/_display/itemsStrategy/Direct]'] = true;    // @ts-ignore
    // @ts-ignore
    Direct.prototype._itemsOrder = null;
});