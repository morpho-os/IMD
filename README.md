# IMD/Imports Module Definition

IMD is extremely small implementation of the [AMD specification](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) that performs absolutely no loading: it uses the modules which have already been defined with the `define()` function call.

IMD can be used with TypeScript applications when:
* you need AMD module loader (it can be produced with `tsc --module amd`)
* you want to use only the `<script>` tag to load of your modules
* you want to combine the amd-compatible modules into a .js file and include it with the single `<script>` tag.


## Usage example

```sh
#################################
# 1. Create the project directory

mkdir imd-example
cd imd-example


################
# 2. Install IMD

npm init -y
npm install --save morpho-os/imd


##################################
# 3. Create index.html and scripts

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


###########################################
# 4. Compile modules into the index.js file

tsc --module amd foo.ts --outFile index.js

ls
# bar.ts  foo.ts  index.html  index.js  node_modules  package.json

cat index.js
# Result:
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


##############################################################
# 5. Open index.html in a browser

# alert with the 'hello from bar' should appear
firefox index.html
```


## History of the project and authors

This project is fork of the [original project](https://github.com/PolymerLabs/IMD) with some patches applied by community.

