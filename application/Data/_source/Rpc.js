/// <amd-module name="Data/_source/Rpc" />
/**
 * Источник данных, работающий по технологии RPC.
 * Это абстрактный класс, не предназначенный для создания самостоятельных экземпляров.
 * @class WS.Data/Source/Rpc
 * @extends WS.Data/Source/Remote
 * @implements WS.Data/Source/IRpc
 * @public
 * @author Мальцев А.А.
 */
define('Data/_source/Rpc', [
    'require',
    'exports',
    'tslib',
    'Data/_source/Remote'
], function (require, exports, tslib_1, Remote_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var Rpc = /** @class */
    function (_super) {
        tslib_1.__extends(Rpc, _super);
        function Rpc() {
            //region IRpc
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this['[Data/_source/IRpc]'] = true;
            return _this;    //endregion
        }
        //endregion
        Rpc.prototype.call = function (command, data) {
            var _this = this;
            return this._callProvider(command, data).addCallback(function (data) {
                return _this._loadAdditionalDependencies().addCallback(function () {
                    return _this._wrapToDataSet(data);
                });
            });
        };
        Object.defineProperty(Rpc, 'NAVIGATION_TYPE', {
            //endregion
            //region Statics
            //FIXME: something went wrong with inheritance of static members in IE
            get: function () {
                return Remote_1.default.NAVIGATION_TYPE;
            },
            enumerable: true,
            configurable: true
        });
        return Rpc;
    }(Remote_1.default);
    exports.default = Rpc;
    Rpc.prototype._moduleName = 'Data/source:Rpc';
    Rpc.prototype['[Data/_source/Rpc]'] = true;
});