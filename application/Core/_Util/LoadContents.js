define('Core/_Util/LoadContents', [
    'require',
    'exports',
    'tslib',
    'Core/Util/Object',
    'Core/_Util/Constants'
], function (require, exports, tslib_1, Object_1, Constants_1) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var RESOURCES_FOLDER = 'resources';    /**
     * Загружает метаданные сервиса в приложение
     * @param {Object} contents Метаданные сервиса в формате JSON
     * @param {Boolean} [replace=false] Заменять ли содержимое.
     * @param {Object} [options] опции для указания пути до service (/, /auth/ etc.) и resources (resources, myresources).
     */
    /**
     * Загружает метаданные сервиса в приложение
     * @param {Object} contents Метаданные сервиса в формате JSON
     * @param {Boolean} [replace=false] Заменять ли содержимое.
     * @param {Object} [options] опции для указания пути до service (/, /auth/ etc.) и resources (resources, myresources).
     */
    function default_1(contents, replace, options) {
        if (replace === void 0) {
            replace = false;
        }
        if (options === void 0) {
            options = {};
        }
        var global = (0, eval)('this');
        if (replace) {
            Constants_1.default.hosts = [];
            Constants_1.default.jsPackages = {};
            Constants_1.default.xmlPackages = {};
            Constants_1.default.xmlContents = {};
            Constants_1.default.hdlBindings = {};
            Constants_1.default.services = {};
            Constants_1.default.modules = {};
            Constants_1.default.htmlNames = {};
            Constants_1.default.jsModules = {};
            Constants_1.default.dictionary = {};
            Constants_1.default.availableLanguage = {};
        }    // Формируем options
        // Формируем options
        options.service = removeLeadingSlash(removeTrailingSlash(options.service || '/'));
        options.resources = removeLeadingSlash(removeTrailingSlash(options.resources || RESOURCES_FOLDER));
        function removeLeadingSlash(path) {
            if (path) {
                var head = path[0];
                if (head === '/' || head === '\\') {
                    return path.substr(1);
                }
            }
            return path;
        }
        function removeTrailingSlash(path) {
            if (path) {
                var tail = path.substr(path.length - 1);
                if (tail === '/' || tail === '\\') {
                    return path.substr(0, path.length - 1);
                }
            }
            return path;
        }
        function pathjoin(path1, path2) {
            if (path1 !== '') {
                var head = path1[0];
                if (head !== '/' && head !== '\\' && path1.charAt(1) !== ':' && path1.indexOf('http:') < 0) {
                    path1 = '/' + path1;
                }
            }
            var path = '';
            if (!path1 && /[a-z]+:\/{2}/i.test(path2)) {
                path = path2;
            } else {
                path = path1 + '/' + path2;
            }
            if (Constants_1.default.appRoot && path.indexOf(Constants_1.default.appRoot) === 0) {
                path = path.replace(Constants_1.default.appRoot, '/');
            }
            return path;
        }
        if (contents) {
            var contentsCopy_1 = tslib_1.__assign({}, contents);    // Detect base path to the resources
            // Detect base path to the resources
            var basePath_1 = options.service === '' && options.resources === '' ? options.resources : pathjoin(options.service, options.resources);
            if (basePath_1 && !options.service) {
                basePath_1 = removeLeadingSlash(basePath_1);
            }    // Processing buildnumber, patch and dictionary for every module
            // Processing buildnumber, patch and dictionary for every module
            var buildNumber_1 = contentsCopy_1.buildnumber;
            var dictionary_1 = {};
            var paths_1 = {};
            if (contentsCopy_1.modules) {
                Object.keys(contentsCopy_1.modules).forEach(function (name) {
                    if (name === 'Core') {
                        return;
                    }
                    var config = contentsCopy_1.modules[name];
                    if (buildNumber_1 && !config.hasOwnProperty('buildnumber')) {
                        config.buildnumber = buildNumber_1;
                    }
                    paths_1[name] = config.hasOwnProperty('path') ? config.path : basePath_1 + '/' + name;
                    if (config.hasOwnProperty('dict')) {
                        config.dict.forEach(function (dict) {
                            var dictFile = dict.indexOf('.css') > 0 ? dict : dict + '.json';
                            dictionary_1[name + '.' + dictFile] = true;
                        });
                    }
                });
            }
            contentsCopy_1.dictionary = dictionary_1;    // TODO: get rid of this
            // TODO: get rid of this
            contentsCopy_1.requirejsPaths = paths_1;    // Translate local contents to the constants and global contents
            // Translate local contents to the constants and global contents
            var mergeConfig = { preferSource: options.preferSource || false };
            Object_1.merge(Constants_1.default, contentsCopy_1, mergeConfig);
            if (global.contents) {
                Object_1.merge(global.contents, contentsCopy_1, mergeConfig);
            }    // Re-set modules paths to RequireJS config
            // Re-set modules paths to RequireJS config
            requirejs.config({ paths: Constants_1.default.requirejsPaths });
        }
    }
    exports.default = default_1;
});