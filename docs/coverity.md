# Static Analysis with Coverity
__TODO__: Add more explanation of how/why we use Coverity, and how it fits into the development process (after we figure 
that out). 

## Lack of TypeScript Support
Coverity, unfortunately, does not support TypeScript. To work around this, we must compile the TypeScript down
to Javascript that Coverity can handle. 

### Problems with Compilation Work-Around
Unlike webpack and the Typescript compiler, it is impossible to customize
the module resolution of Coverity (cannot define path aliases, cannot configure it to allow paths relative to the 
project root, etc.). This is annoying, because the default module path resolution supports ONLY relative paths (relative
to the location of the file that is importing). We make use of webpack and Typescript configuration to allow us to use
more convenient import paths that are relative to the root of the project. This allows us to conveniently import our own
modules in a consistent manner without tons of "../../../" in the paths, but Coverity cannot resolve these imports
that are relative to the project root. 

### Solution to Problems with Compilation Work-Around
So we have a crazy work-around that takes advantage of how node modules are resolved. When compiling for Coverity via 
the [compile-for-coverity](docs/npm-scripts.md##compile-for-coverity) script, the transpiled output retains the folder 
structure of the original source code, but is nested in a "node_modules" folder in the output folder. For example, 
`src/components/Clock.tsx` would be transpiled and output as `out/node_modules/src/components/Clock.js`. When Coverity
sees the import for `src/Components/Clock.js`, it will first fail to find that module relative to the file that is 
importing the module and then fall back to trying to resolve it as a node module. it will traverse up the fodler structure 
until it finds our "node_modules" folder, at which point it will succeed at finding `src/Components/Clock.js` relative 
to `out/node_modules`. We trick Coverity into loading our own modules as if they were node modules. Any imports of real 
node modules in our project will fail to resolve here, and Coverity will continue traversing up the folder structure
until it finds the real "node_modules" folder at the root of our project. The real node modules will be properly 
resolved in teh real "node_modules" folder. 

### Compilation Work-Around Limitations
* Aside from configuring webpack and Typescript to support import paths as realtive to the project root, we cannot make 
further use of import path aliasing for convenience.
* Coverity does not seem to handle imports of the "./" path properly. This is supposed to basically default to
importing "./index.js". Typescript and webpack both handle it as expected, but Coverity fails. The workaround to that is
to explicitly import "./index" instead. Unfortunately, there is no obvious indication if you forget and use "./" instead.
There will only be a subtle lack of analysis performed by Coverity.
* All Coverity issues are reported in terms of the transpiled JS output files in the awkward `node_modules/*` 
(actual node modules) and
`out/node_modules/src/*` (our project modules) paths. When reviewing Coverity issues, you must be aware of this awkward
folder structure. If an issue exists in our own code, then you must manually figure out how the location of the issue
corresponds to lines of code in the original Typescript source. 