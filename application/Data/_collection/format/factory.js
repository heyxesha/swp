/// <amd-module name="Data/_collection/format/factory" />
/**
 * Фабрика форматов - конструирует формат по декларативному описанию
 * @author Мальцев А.А.
 */
define('Data/_collection/format/factory', [
    'require',
    'exports',
    'Data/_collection/format/Format',
    'Data/type',
    'Data/util'
], function (require, exports, Format_1, type_1, util_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });    /**
     * Конструирует формат полей по декларативному описанию
     * @param {Array.<WS.Data/Format/FieldsFactory/FieldDeclaration.typedef>} declaration Декларативное описание
     * @return {WS.Data/Format/Format}
     */
    /**
     * Конструирует формат полей по декларативному описанию
     * @param {Array.<WS.Data/Format/FieldsFactory/FieldDeclaration.typedef>} declaration Декларативное описание
     * @return {WS.Data/Format/Format}
     */
    function factory(declaration) {
        if (!declaration || !(declaration instanceof Array)) {
            throw new TypeError('Data/_collection/format/factory: declaration should be an instance of Array');
        }
        var instance = new Format_1.default();
        for (var i = 0; i < declaration.length; i++) {
            instance.add(type_1.format.fieldsFactory(declaration[i]));
        }
        return instance;
    }
    exports.default = factory;
    util_1.di.register('Data/collection:format.factory', factory, { instantiate: false });
});