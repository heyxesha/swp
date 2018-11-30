/// <amd-module name="Data/_source/provider/SbisBusinessLogic" />
/**
 * JSON-RPC Провайдер для бизнес-логики СБиС
 * @class WS.Data/Source/Provider/SbisBusinessLogic
 * @implements WS.Data/Source/Provider/IAbstract
 * @mixes WS.Data/Entity/OptionsMixin
 * @public
 * @author Мальцев А.А.
 */
define('Data/_source/provider/SbisBusinessLogic', [
    'require',
    'exports',
    'tslib',
    'Data/type',
    'Data/util',
    'Transport/RPCJSON'
], function (require, exports, tslib_1, type_1, util_1, RpcJson) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var SbisBusinessLogic = /** @class */
    function (_super) {
        tslib_1.__extends(SbisBusinessLogic, _super);
        function SbisBusinessLogic(options) {
            var _this = _super.call(this) || this;
            _this['[Data/_source/provider/IAbstract]'] = true;    /**
             * @cfg {Endpoint} Конечная точка, обеспечивающая доступ клиента к БЛ
             * @name WS.Data/Source/Provider/SbisBusinessLogic#endpoint
             * @see getEndPoint
             * @example
             * <pre>
             *    var dataSource = new SbisBusinessLogic({
             *       endpoint: {
             *          address: '/service/url/',
             *          contract: 'Сотрудник'
             *       }
             *    });
             * </pre>
             */
            /**
             * @cfg {Endpoint} Конечная точка, обеспечивающая доступ клиента к БЛ
             * @name WS.Data/Source/Provider/SbisBusinessLogic#endpoint
             * @see getEndPoint
             * @example
             * <pre>
             *    var dataSource = new SbisBusinessLogic({
             *       endpoint: {
             *          address: '/service/url/',
             *          contract: 'Сотрудник'
             *       }
             *    });
             * </pre>
             */
            _this._$endpoint = {};
            type_1.OptionsMixin.call(_this, options);
            return _this;
        }    /**
         * Возвращает конечную точку, обеспечивающую доступ клиента к функциональным возможностям БЛ
         * @return {Endpoint}
         * @see endpoint
         */
        /**
         * Возвращает конечную точку, обеспечивающую доступ клиента к функциональным возможностям БЛ
         * @return {Endpoint}
         * @see endpoint
         */
        SbisBusinessLogic.prototype.getEndpoint = function () {
            return this._$endpoint;
        };
        SbisBusinessLogic.prototype.call = function (name, args) {
            name = name + '';
            args = args || {};
            var Transport = this._$transport;
            var endpoint = this.getEndpoint();
            var overrideContract = name.indexOf('.') > -1;
            if (!overrideContract && endpoint.contract) {
                name = endpoint.contract + this._nameSpaceSeparator + name;
            }
            return new Transport({ serviceUrl: endpoint.address }).callMethod(name, args);
        };
        return SbisBusinessLogic;
    }(util_1.mixin(Object, type_1.OptionsMixin));
    exports.default = SbisBusinessLogic;
    SbisBusinessLogic.prototype['[Data/_source/provider/SbisBusinessLogic]'] = true;
    SbisBusinessLogic.prototype._$transport = RpcJson;
    SbisBusinessLogic.prototype._nameSpaceSeparator = '.';
    util_1.di.register('Data/source:provider.SbisBusinessLogic', SbisBusinessLogic, { instantiate: false });
});