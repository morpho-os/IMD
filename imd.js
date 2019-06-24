"use strict";
(function (scope) {
    'use strict';
    var _modules = Object.create(null);
    function define(id, dependencies, factory) {
        if (!factory) {
            factory = (dependencies || id);
        }
        if (Array.isArray(id)) {
            dependencies = id;
        }
        if (typeof id !== 'string') {
            id = _inferModuleId();
        }
        if (id.indexOf('\\') !== -1) {
            throw new TypeError('Please use / as module path delimiters');
        }
        if (id in _modules) {
            throw new Error('The module "' + id + '" has already been defined');
        }
        var base = id.match(/^(.*?)[^\/]*$/)[1];
        if (base === '') {
            base = id;
        }
        _modules[id] = _runFactory(id, base, dependencies, factory);
        return _modules[id];
    }
    define._modules = _modules;
    define.amd = {};
    function _inferModuleId() {
        var script = document._currentScript || document.currentScript;
        if (script && script.hasAttribute('as')) {
            return script.getAttribute('as');
        }
        var doc = script && script.ownerDocument || document;
        if (!doc.baseURI) {
            throw new Error('Unable to determine a module id: No baseURI for the document');
        }
        if (script && script.hasAttribute('src')) {
            return new URL(script.getAttribute('src'), doc.baseURI).pathname;
        }
        return doc.baseURI;
    }
    function _runFactory(moduleId, base, dependencies, factory) {
        if (typeof factory !== 'function') {
            return factory;
        }
        var exports = {};
        var module = { id: moduleId };
        var modules;
        if (Array.isArray(dependencies)) {
            modules = dependencies.map(function (id) {
                if (id === 'exports') {
                    return exports;
                }
                if (id === 'require') {
                    return _require;
                }
                if (id === 'module') {
                    return module;
                }
                id = _resolveRelativeId(base, id);
                return _require(id);
            });
        }
        else {
            modules = [_require, exports, module];
        }
        var result = factory.apply(null, modules);
        return result || module.exports || exports;
    }
    function _resolveRelativeId(base, id) {
        if (id[0] !== '.') {
            return id;
        }
        var match = base.match(/^([^\/]*\/\/[^\/]+\/)?(.*?)\/?$/);
        var prefix = match[1] || '';
        var terms = match[2] ? match[2].split('/') : [];
        var idTerms = id.match(/^\/?(.*?)\/?$/)[1].split('/');
        for (var i = 0; i < idTerms.length; i++) {
            var idTerm = idTerms[i];
            if (idTerm === '.') {
                continue;
            }
            else if (idTerm === '..') {
                terms.pop();
            }
            else {
                terms.push(idTerm);
            }
        }
        return prefix + terms.join('/');
    }
    function _require(id) {
        if (!(id in _modules)) {
            throw new ReferenceError('The module "' + id + '" has not been loaded');
        }
        return _modules[id];
    }
    scope.define = define;
})(window);
//# sourceMappingURL=imd.js.map