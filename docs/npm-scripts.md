# NPM Scripts 
NPM scripts are defined in package.json.

## Table of Contents
- [Running scripts from IntelliJ IDEA](#running-scripts-from-intellij-idea)
- [Running scripts from a terminal](#running-scripts-from-a-terminal)
    - [Passing command-line params to scripts](#passing-command-line-params-to-scripts)
- [Scripts Reference (Alphabetical)](#scripts-reference) - list of all scripts and documentation.
    - [bamboo-test](#bamboo-test)
    - [build-api-code-generator](#build-api-code-generator)
    - [build-sandbox](#build-sandbox)
    - [buildProd](#buildProd)
    - [buildProdTest](#buildProdTest)
    - [compile](#compile)
    - [compile-for-coverity](#compile-for-coverity)
    - [compile-tslint-rules](#compile-tslint-rules)
    - [generate-api-code](#generate-api-code)
    - [lint](#lint)
    - [lint-fix](#lint-fix)
    - [npm-check-updates](#npm-check-updates)
    - [npm-install](#npm-install)
    - [npm-reinstall](#npm-reinstall)
    - [npm-update](#npm-update)
    - [precommit](#precommit)
    - [prettier](#prettier)
    - [prettier-fix](#prettier-fix)
    - [start](#start)
    - [start-sandbox](#start-sandbox)
    - [static-analysis-sonarqube](#static-analysis-sonarqube)
    - [test](#test)
    - [test-changes](#test-changes)
    - [test-coverage](#test-coverage)
    - [test-watch-changes](#test-watch-changes)
    - [zip-dist](#zip-dist)

## <a name="running-scripts-from-intellij-idea"/>Running scripts from IntelliJ IDEA
These scripts will be listed in the "npm" tool window in IntelliJ IDEA. Double-click a script to run it. 
Right-click a script to access a "Jump to source" option to quickly navigate to its definition.

## <a name="running-scripts-from-a-terminal"/>Running scripts from a terminal
NPM scripts can be run from the terminal if the working directory is the project root:
```
npm run script-name
```

### <a name="passing-command-line-params-to-scripts"/>Passing command-line params to scripts
It is possible to pass command-line params to the underlying command of the NPM script by providing them after
a `--` separator:
```
npm run script-name -- --flag-for-underlying-command --param-with-value=value
```

Just be aware that everything after the `--` is simply appended to the end of the NPM script's implementation.

## <a name="scripts-reference"/>Scripts Reference (Alphabetical)
### <a name="bamboo-test"/>bamboo-test
Runs all tests that must pass for a bamboo build to succeed.

Used by Bamboo.

### <a name="build-api-code-generator"/>build-api-code-generator
Builds our custom swagger-codegen API code generator.

More details [here](../swagger-codegen/README.md).

### <a name="build-sandbox"/>build-sandbox
Builds the [sandbox app](../src/sandbox/README.md).

Outputs to the `dist/` folder.

### <a name="buildProd"/>buildProd
Builds the project for production. This build will not have any debugging code/tools. 

Outputs to the `dist/` folder.

The URL to the API can be specified as a command line argument:
```
npm run buildProd -- --env.apiBaseUrl=http://api.pds.control-tec.com/base/path/
``` 

Used by Bamboo.

### <a name="buildProdTest"/>buildProdTest
Builds the project for a production "test". This build will mostly be identical to a 
production build, but will have some basic debugging tools like source map files to help
developers investigate production issues.

Outputs to the `dist/` folder.

The URL to the API can be specified as a command line argument:
```
npm run buildProd -- --env.apiBaseUrl=http://api.pds.control-tec.com/base/path/
```

Used by Bamboo.

### <a name="clean"/>clean
Cleans the `dist/` folder to prepare for a fresh build of the project.

### <a name="compile"/>compile
Runs the TypeScript compiler against the entire project for the purpose of testing for compiler errors.
This does not generate any output. It only displays results of compilation. 

Use this to easily confirm whethere any of the code has any compiler errors/warnings.

Compiler configuration is in `tsconfig.json`.

See also, [precommit](#precommit)

### <a name="compile-for-coverity"/>compile-for-coverity
Runs the TypeScript compiler against the entire project to produce transpiled output that can be analyzed
by Coverity.

Compiler configuration is in `tsconfig.json`.

See [Static Analysis with Coverity](coverity.md) for more details.

### <a name="compile-tslint-rules"/>compile-tslint-rules
Compiles our custom TSLint rules.

Compiler configuration is in `tslint-rules/tsconfig.json`.

See the [TSLint Rules README](../tslint-rules/README.md) for more details.

### <a name="generate-api-code"/>generate-api-code
Generates TypeScript interfaces and helper methods for interacting with the API. 

More details [here](../swagger-codegen/README.md).

### <a name="lint"/>lint
Runs tslint against the entire project and reports any linting errors.

Linting configuration is in `tslint.json`.

See also, [lint-fix](#lint-fix), [precommit](#precommit)

### <a name="lint-fix"/>lint-fix
Runs tslint against the entire project with the "fix" option.
All linting errors that can be automatically fixed will be fixed (.e.g., missing semicolon).
All remaining linting errors are reported.

Linting configuration is in `tslint.json`.

See also, [lint](#lint)

### <a name="npm-check-updates"/>npm-check-updates
Checks for updates that are available to any npm packages used by this project and outputs a report of each package that 
can be updated, what version we use (controlled by package-lock.json), and the latest version that is available.

Simply runs "npm-check-updates" without any args. Documentation for options can be found 
[here](https://github.com/tjunnone/npm-check-updates). 

### <a name="npm-install"/>npm-install
Installs all node dependencies. 

Run this:
- After cloning the repository for the first time.
- After checking out a new branch, pulling changes, or merging changes from another branch that may introduce a new 
dependency.

### <a name="npm-reinstall"/>npm-reinstall
Performs a complete fresh re-install of all node dependencies. This is quite a bit slower than 
[npm-install](#npm-install) for incremental updates, but is useful if you believe your node_modules
folder has somehow become corrupt or out of sync.

### <a name="npm-update"/>npm-update
Upgrades all npm packages to the latest available version that matches the version descriptor in package.json.
This will both install the updates and rebuild package-lock.json accordingly.

### <a name="precommit"/>precommit
It is good practice to run this script before committing changes to ensure that your changes do not obviously break the
application.

This script runs the compiler, linter, and tests. The script fails if any one of them fails.

### <a name="prettier"/>prettier
Runs "prettier" code formatting validation. Fails if any files do not match the strict formatting style.

### <a name="prettier-fix"/>prettier-fix
Runs "prettier" code formatting and re-writes files properly formatted as necessary.

### <a name="start"/>start
Starts a dev server and launches the app in the system default browser application. Uses webpack-dev-server
with Hot Module Reloading (HMR) for quick/convenient feedback while developing.

### <a name="start-sandbox"/>start-sandbox
Starts a dev server and launches the [sandbox app](../src/sandbox/README.md) in the system default browser application. 
Uses webpack-dev-server with Hot Module Reloading (HMR) for quick/convenient feedback while developing.

NOTE: uses a different port number than `start-server` so that you can have the web app and sandbox running 
simultaneously.

### <a name="static-analysis-sonarqube"/>static-analysis-sonarqube
Runs static code analysis using SonarQube and commits the results to https://sonarqube.control-tec.com. 

### <a name="test"/>test
Runs all unit tests once.

See also, [test-coverage](#test-coverage), [test-changes](#test-changes), [test-watch-changes](#test-watch-changes), [precommit](#precommit)

### <a name="test-changes"/>test-changes
Runs unit tests that are related to files that have been changed. This is a single run only.

See also, [test](#test), [test-coverage](#test-coverage), [test-watch-changes](#test-watch-changes)

### <a name="test-coverage"/>test-coverage
Runs all unit tests once and collects code coverage data.
A summary of coverage statistics is displayed, and detailed coverage results are output to the
`coverage/` folder. 

Load `coverage/lcov-report/src/index.html` in a browser to browser detailed coverage by folder/file/line.

See also, [test](#test), [test-changes](#test-changes), [test-watch-changes](#test-watch-changes)

### <a name="test-watch-changes"/>test-watch-changes
Runs unit tests that are related to files that have been changed, and continues to watch for changes
and re-run unit tests that are affected by subsequent changes.

This is useful for getting quick feedback on how your changes are affecting unit tests. 
This is more efficient than manually re-running unit tests after changes, because the overhead of
initializing the unit tests occurs only once, and subsequent runs due to changes are very quick.

NOTE: This script does not work very well when run via IntelliJ IDEA because it appends to the output console every 
time tests are run. This makes it very difficult to determine what the most recent test results are. Running this script
from a stand-alone terminal (`npm run test-watch-changes`) provides a much better experience.

See also, [test](#test), [test-coverage](#test-coverage), [test-changes](#test-changes)

### <a name="zip-dist"/>zip-dist
Zips the `dist/` folder for convenient deployment.

Used by Bamboo.
