interface Window {
    define: DefineFn;
}

type AmdModuleId = string;
type DependentFromAmdModuleId = AmdModuleId;
type AmdModuleFactory = (...dependencies: any[]) => any

/**
 * Define is function with
 */
interface DefineFn {
    (moduleId: AmdModuleId | DependentFromAmdModuleId[] | AmdModuleFactory, dependencies: DependentFromAmdModuleId[] | AmdModuleFactory, factory?: AmdModuleFactory): any;
    _modules: Record<AmdModuleId, AmdModule>; //  Semi-private, exposed for tests & introspection
    amd: {}; // https://github.com/amdjs/amdjs-api/blob/master/AMD.md#defineamd-property-
}
declare const define: DefineFn

interface AmdModule {
    id: string;
    exports?: any[];
}


