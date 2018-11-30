/// <amd-module name="Data/_display/CollectionItem" />
/**
 * Элемент коллекции
 * @class WS.Data/Display/CollectionItem
 * @extends WS.Data/Entity/Abstract
 * @mixes WS.Data/Entity/OptionsMixin
 * @implements WS.Data/Entity/IInstantiable
 * @mixes WS.Data/Entity/InstantiableMixin
 * @mixes WS.Data/Entity/SerializableMixin
 * @public
 * @author Мальцев А.А.
 */
define('Data/_display/CollectionItem', [
    'require',
    'exports',
    'tslib',
    'Data/type',
    'Data/util'
], function (require, exports, tslib_1, type_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var CollectionItem = /** @class */
    function (_super) {
        tslib_1.__extends(CollectionItem, _super);
        function CollectionItem(options) {
            var _this = _super.call(this) || this;
            type_1.OptionsMixin.call(_this, options);
            type_1.SerializableMixin.constructor.call(_this);
            return _this;
        }    //endregion
             //region SerializableMixin
        //endregion
        //region SerializableMixin
        CollectionItem.prototype._getSerializableState = function (state) {
            state = type_1.SerializableMixin._getSerializableState.call(this, state);
            if (state.$options.owner) {
                //save element index if collections implements WS.Data/Collection/IList
                var collection = state.$options.owner.getCollection();
                var index = collection['[Data/_collection/IList]'] ? collection.getIndex(state.$options.contents) : -1;
                if (index > -1) {
                    state.ci = index;
                    delete state.$options.contents;
                }
            }    //By performance reason. It will be restored at Collection::_setSerializableState
                 //delete state.$options.owner;
            //By performance reason. It will be restored at Collection::_setSerializableState
            //delete state.$options.owner;
            state.iid = this.getInstanceId();
            return state;
        };
        CollectionItem.prototype._setSerializableState = function (state) {
            var fromSerializableMixin = type_1.SerializableMixin._setSerializableState(state);
            return function () {
                fromSerializableMixin.call(this);
                if (state.hasOwnProperty('ci')) {
                    this._contentsIndex = state.ci;
                }
                this._instanceId = state.iid;
            };
        };    //endregion
              //region Public
              /**
         * Возвращает коллекцию, которой принадлежит элемент
         * @return {WS.Data/Collection/IEnumerable}
         */
        //endregion
        //region Public
        /**
         * Возвращает коллекцию, которой принадлежит элемент
         * @return {WS.Data/Collection/IEnumerable}
         */
        CollectionItem.prototype.getOwner = function () {
            return this._$owner;
        };    /**
         * Устанавливает коллекцию, которой принадлежит элемент
         * @param {WS.Data/Collection/IEnumerable} owner Коллекция, которой принадлежит элемент
         */
        /**
         * Устанавливает коллекцию, которой принадлежит элемент
         * @param {WS.Data/Collection/IEnumerable} owner Коллекция, которой принадлежит элемент
         */
        CollectionItem.prototype.setOwner = function (owner) {
            this._$owner = owner;
        };    /**
         * Возвращает содержимое элемента коллекции
         * @return {*}
         */
        /**
         * Возвращает содержимое элемента коллекции
         * @return {*}
         */
        CollectionItem.prototype.getContents = function () {
            if (this._contentsIndex !== undefined) {
                //Ленивое восстановление _$contents по _contentsIndex после десериализации
                this._$contents = this.getOwner().getCollection().at(this._contentsIndex);
                this._contentsIndex = undefined;
            }
            return this._$contents;
        };    /**
         * Устанавливает содержимое элемента коллекции
         * @param {*} contents Новое содержимое
         * @param {Boolean} [silent=false] Не уведомлять владельца об изменении содержимого
         */
        /**
         * Устанавливает содержимое элемента коллекции
         * @param {*} contents Новое содержимое
         * @param {Boolean} [silent=false] Не уведомлять владельца об изменении содержимого
         */
        CollectionItem.prototype.setContents = function (contents, silent) {
            if (this._$contents === contents) {
                return;
            }
            this._$contents = contents;
            if (!silent) {
                this._notifyItemChangeToOwner('contents');
            }
        };    /**
         * Возвращает псевдоуникальный идентификатор элемента коллекции, основанный на значении опции {@link contents}.
         * @return {String|undefined}
         */
        /**
         * Возвращает псевдоуникальный идентификатор элемента коллекции, основанный на значении опции {@link contents}.
         * @return {String|undefined}
         */
        CollectionItem.prototype.getUid = function () {
            if (!this._$owner) {
                return;
            }
            return this._$owner.getItemUid(this);
        };    /**
         * Возвращает признак, что элемент выбран
         * @return {*}
         */
        /**
         * Возвращает признак, что элемент выбран
         * @return {*}
         */
        CollectionItem.prototype.isSelected = function () {
            return this._$selected;
        };    /**
         * Устанавливает признак, что элемент выбран
         * @param {Boolean} selected Элемент выбран
         * @param {Boolean} [silent=false] Не уведомлять владельца об изменении признака выбранности
         */
        /**
         * Устанавливает признак, что элемент выбран
         * @param {Boolean} selected Элемент выбран
         * @param {Boolean} [silent=false] Не уведомлять владельца об изменении признака выбранности
         */
        CollectionItem.prototype.setSelected = function (selected, silent) {
            if (this._$selected === selected) {
                return;
            }
            this._$selected = selected;
            if (!silent) {
                this._notifyItemChangeToOwner('selected');
            }
        };    //endregion
              //region Protected
              /**
         * Возвращает коллекцию проекции
         * @return {WS.Data/Collection/IEnumerable}
         * @protected
         */
        //endregion
        //region Protected
        /**
         * Возвращает коллекцию проекции
         * @return {WS.Data/Collection/IEnumerable}
         * @protected
         */
        CollectionItem.prototype._getSourceCollection = function () {
            return this.getOwner().getCollection();
        };    /**
         * Генерирует событие у владельца об изменении свойства элемента
         * @param {String} property Измененное свойство
         * @protected
         */
        /**
         * Генерирует событие у владельца об изменении свойства элемента
         * @param {String} property Измененное свойство
         * @protected
         */
        CollectionItem.prototype._notifyItemChangeToOwner = function (property) {
            if (this._$owner) {
                this._$owner.notifyItemChange(this, property);
            }
        };
        return CollectionItem;
    }(util_1.mixin(type_1.Abstract, type_1.OptionsMixin, type_1.InstantiableMixin, type_1.SerializableMixin));
    exports.default = CollectionItem;
    CollectionItem.prototype._moduleName = 'Data/display:CollectionItem';
    CollectionItem.prototype['[Data/_display/CollectionItem]'] = true;    // @ts-ignore
    // @ts-ignore
    CollectionItem.prototype._$owner = null;    // @ts-ignore
    // @ts-ignore
    CollectionItem.prototype._$contents = null;    // @ts-ignore
    // @ts-ignore
    CollectionItem.prototype._$selected = false;    // @ts-ignore
    // @ts-ignore
    CollectionItem.prototype._instancePrefix = 'collection-item-';    // @ts-ignore
    // @ts-ignore
    CollectionItem.prototype._contentsIndex = undefined;    // Deprecated
    // Deprecated
    CollectionItem.prototype['[WS.Data/Display/CollectionItem]'] = true;
    util_1.di.register('Data/display:CollectionItem', CollectionItem);
});