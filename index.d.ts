interface Window {
    define(id: string | string[] | Factory, dependencies: string[] | Factory, factory?: Factory): any;
}

interface Function {
    _modules: any;
    amd: {};
}

interface Module {
    id: string;
    exports?: any[];
}

interface Document {
    readonly _currentScript: HTMLScriptElement | SVGScriptElement;
}

type Factory = ((...dependencies: any[]) => any);
