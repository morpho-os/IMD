"use strict";
(function (globalScope) {
    "use strict";
    const _loadedModules = Object.create(null);
    function define(moduleId, dependencies, factory) {
        if (!factory) {
            factory = (dependencies || moduleId);
        }
        if (Array.isArray(moduleId)) {
            dependencies = moduleId;
        }
        if (typeof moduleId !== 'string') {
            moduleId = _inferModuleId();
        }
        if (moduleId.indexOf('\\') !== -1) {
            throw new TypeError('Please use / as module path delimiters');
        }
        if (moduleId in _loadedModules) {
            throw new Error('The module "' + moduleId + '" has already been defined');
        }
        let base = moduleId.match(/^(.*?)[^\/]*$/)[1];
        if (base === '') {
            base = moduleId;
        }
        _loadedModules[moduleId] = _runFactory(moduleId, base, dependencies, factory);
        return _loadedModules[moduleId];
    }
    define._modules = _loadedModules;
    define.amd = {};
    function _inferModuleId() {
        const script = document._currentScript || document.currentScript;
        const attrName = 'data-amd';
        if (script && script.hasAttribute(attrName)) {
            return script.getAttribute(attrName);
        }
        const doc = script && script.ownerDocument || document;
        if (!doc.baseURI) {
            throw new Error('Unable to determine a module ID: No baseURI for the document');
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
        const exports = {};
        const module = { id: moduleId };
        let modules;
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
        const result = factory.apply(null, modules);
        return result || module.exports || exports;
    }
    function _resolveRelativeId(base, id) {
        if (id[0] !== '.') {
            return id;
        }
        const match = base.match(/^([^\/]*\/\/[^\/]+\/)?(.*?)\/?$/);
        const prefix = match[1] || '';
        let terms = match[2] ? match[2].split('/') : [];
        const idTerms = id.match(/^\/?(.*?)\/?$/)[1].split('/');
        for (let i = 0; i < idTerms.length; i++) {
            const idTerm = idTerms[i];
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
        if (!(id in _loadedModules)) {
            throw new ReferenceError('The module "' + id + '" has not been loaded');
        }
        return _loadedModules[id];
    }
    globalScope.define = define;
})(window);
//# sourceMappingURL=index.js.map