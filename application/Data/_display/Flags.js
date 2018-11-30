/// <amd-module name="Data/_display/Flags" />
/**
 * Проекция типа "Флаги".
 * @class WS.Data/Display/Flags
 * @extends WS.Data/Display/Collection
 * @public
 * @author Мальцев А.А.
 */
define('Data/_display/Flags', [
    'require',
    'exports',
    'tslib',
    'Data/_display/Collection',
    'Data/util',
    'Data/_display/FlagsItem'
], function (require, exports, tslib_1, Collection_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * Обрабатывает событие об изменении состояния Flags
     * @param event Дескриптор события
     * @param name Название флага
     * @param index Индекс флага
     */
    /**
     * Обрабатывает событие об изменении состояния Flags
     * @param event Дескриптор события
     * @param name Название флага
     * @param index Индекс флага
     */
    function onSourceChange(event, name, index) {
        var item = this.at(this.getIndexBySourceIndex(index));
        this.notifyItemChange(item, 'selected');
    }
    var Flags = /** @class */
    function (_super) {
        tslib_1.__extends(Flags, _super);    /** @lends WS.Data/Display/Flags.prototype */
        /** @lends WS.Data/Display/Flags.prototype */
        function Flags(options) {
            var _this = _super.call(this, options) || this;
            if (!_this._$collection['[Data/_collection/IFlags]']) {
                throw new TypeError(_this._moduleName + ': source collection should implement WS.Data/Type/IFlags');
            }
            if (_this._$collection['[Data/_type/ObservableMixin]']) {
                _this._$collection.subscribe('onChange', _this._onSourceChange);
            }
            return _this;
        }
        Flags.prototype.destroy = function () {
            if (this._$collection['[Data/_type/Abstract]'] && this._$collection['[Data/_type/ObservableMixin]'] && !this._$collection.destroyed) {
                this._$collection.unsubscribe('onChange', this._onSourceChange);
            }
            _super.prototype.destroy.call(this);
        };
        Flags.prototype._bindHandlers = function () {
            _super.prototype._bindHandlers.call(this);
            this._onSourceChange = onSourceChange.bind(this);
        };
        return Flags;
    }(Collection_1.default    /** @lends WS.Data/Display/Flags.prototype */);
    /** @lends WS.Data/Display/Flags.prototype */
    exports.default = Flags;
    Flags.prototype._moduleName = 'Data/display:Flags';
    Flags.prototype['[Data/_display/Flags]'] = true;    // @ts-ignore
    // @ts-ignore
    Flags.prototype._itemModule = 'Data/display:FlagsItem';    // @ts-ignore
    // @ts-ignore
    Flags.prototype._localize = true;
    util_1.di.register('Data/display:Flags', Flags);
});