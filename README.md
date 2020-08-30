# IMD/Imports Module Definition

IMD is extremely small implementation of the [AMD specification](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) that does not perform any HTTP requests - it uses AMD modules which have already been defined via the `define()` function.

An AMD module is the `define()` function call which defined a module and its dependencies, which are other AMD modules.

## Usage cases

This implementation is useful in TypeScript projects which use [AMD modules](https://www.typescriptlang.org/tsconfig#amd).

## Usage example

```sh
mkdir imd-example
cd imd-example
npm init -y
npm install --save morpho-os/imd

cat <<OUT > index.html
<h1>IMD example</h1>

<script src="node_modules/imd/imd.js"></script>
<script src="index.js"></script>
OUT

cat <<OUT > foo.ts
import {hello} from './bar'
hello();
OUT

cat <<OUT > bar.ts
export function hello() {
    alert('hello from bar');
}
OUT
```

Compile modules into the index.js file
```sh
tsc --module amd foo.ts --outFile index.js

ls
# bar.ts  foo.ts  index.html  index.js  node_modules  package.json

cat index.js
# define("bar", ["require", "exports"], function (require, exports) {
#     "use strict";
#     exports.__esModule = true;
#     function hello() {
#         alert('hello from bar');
#     }
#     exports.hello = hello;
# });
# define("foo", ["require", "exports", "bar"], function (require, exports, bar_1) {
#     "use strict";
#     exports.__esModule = true;
#     bar_1.hello();
# });
```

Open index.html in a browser
```sh
# an alert with the 'hello from bar' should appear
firefox index.html
```

## History of the project and authors

This project is fork of the [original project](https://github.com/PolymerLabs/IMD) converted manually to TypeScript.
