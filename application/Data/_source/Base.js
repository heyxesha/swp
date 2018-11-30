/// <amd-module name="Data/_source/Base" />
/**
 * Базовый источник данных.
 * Это абстрактный класс, не предназначенный для создания самостоятельных экземпляров.
 * @class WS.Data/Source/Base
 * @extends WS.Data/Entity/Abstract
 * @implements WS.Data/Source/IData
 * @mixes WS.Data/Entity/OptionsMixin
 * @mixes WS.Data/Entity/SerializableMixin
 * @mixes WS.Data/Source/OptionsMixin
 * @mixes WS.Data/Source/LazyMixin
 * @mixes WS.Data/Source/DataMixin
 * @ignoreOptions options.writable
 * @public
 * @author Мальцев А.А.
 */
define('Data/_source/Base', [
    'require',
    'exports',
    'tslib',
    'Data/_source/OptionsMixin',
    'Data/_source/LazyMixin',
    'Data/_source/DataMixin',
    'Data/type',
    'Data/util'
], function (require, exports, tslib_1, OptionsMixin_1, LazyMixin_1, DataMixin_1, type_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Base = /** @class */
    function (_super) {
        tslib_1.__extends(Base, _super);
        function Base(options) {
            var _this = this;
            options = Object.assign({}, options || {});
            _this = _super.call(this, options) || this;
            OptionsMixin_1.default.constructor.call(_this, options);
            type_1.OptionsMixin.call(_this, options);
            type_1.SerializableMixin.constructor.call(_this);
            DataMixin_1.default.constructor.call(_this, options);
            return _this;
        }
        return Base;
    }(util_1.mixin(type_1.Abstract, type_1.OptionsMixin, type_1.SerializableMixin, OptionsMixin_1.default, LazyMixin_1.default, DataMixin_1.default));
    exports.default = Base;
    Base.prototype._moduleName = 'Data/source:Base';
    Base.prototype['[Data/_source/Base]'] = true;    // @ts-ignore
    // @ts-ignore
    Base.prototype['[Data/_source/IData]'] = true;
});