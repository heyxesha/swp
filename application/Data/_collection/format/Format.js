/// <amd-module name="Data/_collection/format/Format" />
/**
 * Формат полей.
 * Представляет собой список полей записи: WS.Data/Collection/List.<WS.Data/Format/Field>
 * @class WS.Data/Format/Format
 * @extends WS.Data/Collection/List
 * @public
 * @author Мальцев А.А.
 */
define('Data/_collection/format/Format', [
    'require',
    'exports',
    'tslib',
    'Data/type',
    'Data/_collection/List',
    'Data/util'
], function (require, exports, tslib_1, type_1, List_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Format = /** @class */
    function (_super) {
        tslib_1.__extends(Format, _super);    /**
         * @cfg {Array.<WS.Data/Format/Field>} Элементы списка
         * @name WS.Data/Format/Format#items
         */
        /**
         * @cfg {Array.<WS.Data/Format/Field>} Элементы списка
         * @name WS.Data/Format/Format#items
         */
        function Format(options) {
            var _this = _super.call(this, options) || this;
            for (var i = 0, len = _this._$items.length; i < len; i++) {
                _this._checkItem(_this._$items[i]);
                _this._checkName(_this._$items[i], i);
            }
            return _this;
        }    //region List
        //region List
        Format.prototype.add = function (item, at) {
            this._checkItem(item);
            this._checkName(item);
            _super.prototype.add.call(this, item, at);
        };
        Format.prototype.remove = function (item) {
            this._checkItem(item);
            return _super.prototype.remove.call(this, item);
        };
        Format.prototype.replace = function (item, at) {
            this._checkItem(item);
            this._checkName(item, at);
            _super.prototype.replace.call(this, item, at);
        };
        Format.prototype.assign = function (items) {
            items = this._itemsToArray(items);
            for (var i = 0, len = items.length; i < len; i++) {
                this._checkItem(items[i]);
            }
            _super.prototype.assign.call(this, items);
            for (var i = 0, len = this._$items.length; i < len; i++) {
                this._checkName(this._$items[i], i);
            }
        };
        Format.prototype.append = function (items) {
            items = this._itemsToArray(items);
            for (var i = 0, len = items.length; i < len; i++) {
                this._checkItem(items[i]);
                this._checkName(items[i]);
            }
            _super.prototype.append.call(this, items);
        };
        Format.prototype.prepend = function (items) {
            items = this._itemsToArray(items);
            for (var i = 0, len = items.length; i < len; i++) {
                this._checkItem(items[i]);
                this._checkName(items[i]);
            }
            _super.prototype.prepend.call(this, items);
        };
        Format.prototype.getCount = function () {
            return _super.prototype.getCount.call(this);
        };
        Format.prototype.at = function (i) {
            return _super.prototype.at.call(this, i);
        };
        Format.prototype.getIndexByValue = function (name, value) {
            return _super.prototype.getIndexByValue.call(this, name, value);
        };
        Format.prototype.removeAt = function (index) {
            return _super.prototype.removeAt.call(this, index);
        };
        Format.prototype.isEqual = function (format) {
            if (format === this) {
                return true;
            }
            if (!format) {
                return false;
            }
            if (!(format instanceof Format)) {
                return false;
            }
            if (this.getCount() !== format.getCount()) {
                return false;
            }
            for (var i = 0, count = this.getCount(); i < count; i++) {
                if (!this.at(i).isEqual(format.at(i))) {
                    return false;
                }
            }
            return true;
        };    //endregion IEquatable
              //region Public methods
              /**
         * Удаляет поле из формата по имени.
         * Если поля с таким именем нет, генерирует исключение.
         * @param {String} name Имя поля
         */
        //endregion IEquatable
        //region Public methods
        /**
         * Удаляет поле из формата по имени.
         * Если поля с таким именем нет, генерирует исключение.
         * @param {String} name Имя поля
         */
        Format.prototype.removeField = function (name) {
            var index = this.getIndexByValue('name', name);
            if (index === -1) {
                throw new ReferenceError(this._moduleName + '::removeField(): field "' + name + '" doesn\'t found');
            }
            this.removeAt(index);
        };    /**
         * Возвращает индекс поля по его имени.
         * Если поля с таким именем нет, возвращает -1.
         * @param {String} name Имя поля
         * @return {Number}
         */
        /**
         * Возвращает индекс поля по его имени.
         * Если поля с таким именем нет, возвращает -1.
         * @param {String} name Имя поля
         * @return {Number}
         */
        Format.prototype.getFieldIndex = function (name) {
            return this.getIndexByValue('name', name);
        };    /**
         * Возвращает имя поля по его индексу.
         * Если индекс выходит за допустимый диапазон, генерирует исключение.
         * @param {Number} at Имя поля
         * @return {String}
         */
        /**
         * Возвращает имя поля по его индексу.
         * Если индекс выходит за допустимый диапазон, генерирует исключение.
         * @param {Number} at Имя поля
         * @return {String}
         */
        Format.prototype.getFieldName = function (at) {
            return this.at(at).getName();
        };    //endregion Public methods
              //region Protected methods
              /**
         * Проверяет, что переданный элемент - формат поля
         * @protected
         */
        //endregion Public methods
        //region Protected methods
        /**
         * Проверяет, что переданный элемент - формат поля
         * @protected
         */
        Format.prototype._checkItem = function (item) {
            if (!item || !(item instanceof type_1.format.Field)) {
                throw new TypeError('Item should be an instance of "Data/type:format.Field"');
            }
        };    /**
         * Проверяет, что формат поля не дублирует уже существующее имя поля
         * @protected
         */
        /**
         * Проверяет, что формат поля не дублирует уже существующее имя поля
         * @protected
         */
        Format.prototype._checkName = function (item, at) {
            var exists = this.getFieldIndex(item.getName());
            if (exists > -1 && exists !== at) {
                throw new ReferenceError(this._moduleName + ': field with name "' + item.getName() + '" already exists');
            }
        };
        Format.prototype._itemsToArray = function (items) {
            return _super.prototype._itemsToArray.call(this, items);
        };
        return Format;
    }(List_1.default);
    exports.default = Format;
    Format.prototype['[Data/_collection/format/Format]'] = true;    // @ts-ignore
    // @ts-ignore
    Format.prototype['[Data/_type/IEquatable]'] = true;    // @ts-ignore
    // @ts-ignore
    Format.prototype._moduleName = 'Data/collection:format.Format';
    util_1.di.register('Data/collection:format.Format', Format, { instantiate: false });
});