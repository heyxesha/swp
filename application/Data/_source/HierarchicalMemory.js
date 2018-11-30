/// <amd-module name="Data/_source/HierarchicalMemory" />
/**
 * Source which returns "breadcrumbs" to the root of hierarchy in the result of query() method.
 * "Breadcrumbs" stores as Array in property "path" of RecordSet's meta data.
 *
 * Let's create hierarchical source and select data with breadcrumbs:
 * <pre>
 *    require(['Data/source'], function (source) {
 *       var goods = new source.HierarchicalMemory({
 *          data: [
 *             {id: 1, parent: null, name: 'Laptops'},
 *             {id: 10, parent: 1, name: 'Apple MacBook Pro'},
 *             {id: 11, parent: 1, name: 'Xiaomi Mi Notebook Air'},
 *             {id: 2, parent: null, name: 'Smartphones'},
 *             {id: 20, parent: 2, name: 'Apple iPhone'},
 *             {id: 21, parent: 2, name: 'Samsung Galaxy'}
 *          ],
 *          idProperty: 'id',
 *          parentProperty: 'parent'
 *       });
 *
 *       var laptopsQuery = new source.Query();
 *       laptopsQuery.where({parent: 1});
 *
 *       goods.query(laptopsQuery).addCallbacks(function(response) {
 *          var items = response.getAll();
 *          items.forEach(function(item) {
 *              console.log(item.get('name'));//'Apple MacBook Pro', 'Xiaomi Mi Notebook Air'
 *          });
 *          items.getMetaData().path.map(function(item) {
 *             console.log(item.get('name'));//'Laptops'
 *          });
 *       }, function(error) {
 *          console.error(error);
 *       });
 *    });
 * </pre>
 * @class Data/_source/HierarchicalMemory
 * @extends WS.Data/Entity/Abstract
 * @implements WS.Data/Source/ICrud
 * @implements WS.Data/Source/ICrudPlus
 * @mixes WS.Data/Entity/SerializableMixin
 * @author Мальцев А.А.
 */
define('Data/_source/HierarchicalMemory', [
    'require',
    'exports',
    'tslib',
    'Data/_source/Memory',
    'Data/type',
    'Data/util',
    'require',
    'Core/Deferred'
], function (require, exports, tslib_1, Memory_1, type_1, util_1, req, Deferred) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var HierarchicalMemory = /** @class */
    function (_super) {
        tslib_1.__extends(HierarchicalMemory, _super);
        function HierarchicalMemory(options) {
            var _this = _super.call(this) || this;    //region ICrud
            //region ICrud
            _this['[Data/_source/ICrud]'] = true;    //endregion
                                                     //region ICrudPlus
            //endregion
            //region ICrudPlus
            _this['[Data/_source/ICrudPlus]'] = true;
            type_1.SerializableMixin.constructor.call(_this);
            _this._$data = options && options.data;
            _this._$idProperty = options && options.idProperty;
            _this._$parentProperty = options && options.parentProperty;
            _this._source = new Memory_1.default(options);
            return _this;
        }
        HierarchicalMemory.prototype.create = function (meta) {
            return this._source.create(meta);
        };
        HierarchicalMemory.prototype.read = function (key, meta) {
            return this._source.read(key, meta);
        };
        HierarchicalMemory.prototype.update = function (data, meta) {
            return this._source.update(data, meta);
        };
        HierarchicalMemory.prototype.destroy = function (keys, meta) {
            return this._source.destroy(keys, meta);
        };
        HierarchicalMemory.prototype.query = function (query) {
            var _this = this;
            var result = new Deferred();
            req(['Data/collection'], function (collection) {
                _this._source.query(query).addCallbacks(function (response) {
                    if (_this._$parentProperty) {
                        var hierarchy = new type_1.relation.Hierarchy({
                            idProperty: _this._$idProperty,
                            parentProperty: _this._$parentProperty
                        });
                        var sourceRecords = new collection.RecordSet({
                            rawData: _this._$data,
                            adapter: _this._source.getAdapter(),
                            idProperty: _this._$idProperty
                        });    // Extract breadcrumbs as path from filtered node to the root
                        // Extract breadcrumbs as path from filtered node to the root
                        var breadcrumbs = [];
                        var startFromId = query.getWhere()[_this._$parentProperty];
                        var startFromNode = sourceRecords.getRecordById(startFromId);
                        if (startFromNode) {
                            breadcrumbs.push(startFromNode);
                            var node = void 0;
                            while (node = hierarchy.getParent(startFromNode, sourceRecords)) {
                                breadcrumbs.push(node);
                                startFromNode = node.get(_this._$parentProperty);
                            }
                        }    //Store breadcrumbs as 'path' in meta data
                        //Store breadcrumbs as 'path' in meta data
                        var data = response.getRawData(true);
                        if (data) {
                            var metaData = data.meta || {};
                            metaData.path = breadcrumbs;
                            data.meta = metaData;
                            response.setRawData(data);
                        }
                    }
                    result.callback(response);
                }, function (err) {
                    result.errback(err);
                });
            }, function (err) {
                result.errback(err);
            });
            return result;
        };
        HierarchicalMemory.prototype.merge = function (from, to) {
            return this._source.merge(from, to);
        };
        HierarchicalMemory.prototype.copy = function (key, meta) {
            return this._source.copy(key, meta);
        };
        HierarchicalMemory.prototype.move = function (items, target, meta) {
            return this._source.move(items, target, meta);
        };    //endregion
              // region SerializableMixin
        //endregion
        // region SerializableMixin
        HierarchicalMemory.prototype._getSerializableState = function (state) {
            state = type_1.SerializableMixin._getSerializableState.call(this, state);
            state._source = this._source;
            return state;
        };
        HierarchicalMemory.prototype._setSerializableState = function (state) {
            var fromSerializableMixin = type_1.SerializableMixin._setSerializableState(state);
            return function () {
                fromSerializableMixin.call(this);
                this._source = state._source;
            };
        };
        return HierarchicalMemory;
    }(util_1.mixin(type_1.Abstract, type_1.SerializableMixin));
    exports.default = HierarchicalMemory;
    HierarchicalMemory.prototype._moduleName = 'Data/source:HierarchicalMemory';
    HierarchicalMemory.prototype['[Data/_source/HierarchicalMemory]'] = true;
});