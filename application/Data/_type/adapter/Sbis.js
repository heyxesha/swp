/// <amd-module name="Data/_type/adapter/Sbis" />
/**
 * Адаптер для данных в формате СБиС.
 * Работает с форматом данных, который использует БЛ СБИС.
 * Примеры можно посмотреть в модулях {@link WS.Data/Adapter/SbisRecord} и {@link WS.Data/Adapter/SbisTable}.
 * @class WS.Data/Adapter/Sbis
 * @extends WS.Data/Adapter/Abstract
 * @public
 * @author Мальцев А.А.
 */
define('Data/_type/adapter/Sbis', [
    'require',
    'exports',
    'tslib',
    'Data/_type/adapter/Abstract',
    'Data/_type/adapter/SbisTable',
    'Data/_type/adapter/SbisRecord',
    'Data/_type/adapter/SbisFieldType',
    'Data/util'
], function (require, exports, tslib_1, Abstract_1, SbisTable_1, SbisRecord_1, SbisFieldType_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Sbis = /** @class */
    function (_super) {
        tslib_1.__extends(Sbis, _super);    /** @lends WS.Data/Adapter/Sbis.prototype */
        /** @lends WS.Data/Adapter/Sbis.prototype */
        function Sbis() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sbis.prototype.forTable = function (data) {
            return new SbisTable_1.default(data);
        };
        Sbis.prototype.forRecord = function (data) {
            return new SbisRecord_1.default(data);
        };
        Sbis.prototype.getKeyField = function (data) {
            //TODO: primary key field index can be defined in this._data.k. and can be -1
            var index;
            var s;
            if (data && data.s) {
                s = data.s;
                for (var i = 0, l = s.length; i < l; i++) {
                    if (s[i].n && s[i].n[0] === '@') {
                        index = i;
                        break;
                    }
                }
                if (index === undefined && s.length) {
                    index = 0;
                }
            }
            return index === undefined ? undefined : s[index].n;
        };
        Object.defineProperty(Sbis, 'FIELD_TYPE', {
            get: function () {
                return SbisFieldType_1.default;
            },
            enumerable: true,
            configurable: true
        });
        return Sbis;
    }(Abstract_1.default    /** @lends WS.Data/Adapter/Sbis.prototype */);
    /** @lends WS.Data/Adapter/Sbis.prototype */
    exports.default = Sbis;
    Sbis.prototype['[Data/_type/adapter/Sbis]'] = true;
    Sbis.prototype._moduleName = 'Data/type:adapter.Sbis';
    util_1.di.register('Data/type:adapter.Sbis', Sbis, { instantiate: false });    // Deprecated
    // Deprecated
    util_1.di.register('adapter.sbis', Sbis);
});