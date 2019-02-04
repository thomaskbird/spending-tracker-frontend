# React Boilerplate

This repo utilizes webpack for build and development server. It combines sass for css, typescript and react for a seamless easy to use starting point for any single page app.

## Table of Contents

-   [Getting Started](#getting-started)
-   [WebStorm Settings](#webstorm-idea-settings)
-   [Project Overview](#project-overview)
    -   [Folder Structure](#folder-structure)
-   [Code Validation](#code-validation)
-   [Gotchas](#gotchas)
-   [BEM Methodology for CSS](#bem)

-   Additional Documentation
    -   [NPM Scripts](docs/npm-scripts.md)
    -   [Static Analysis with Coverity](docs/coverity.md)
    -   [The Sandbox](src/sandbox/README.md)
    -   [Generated API Code](swagger-codegen/README.md)

## <a name="getting-started"/>Getting Started

1.  Install [WebStorm](https://www.jetbrains.com/webstorm/), if not already installed.
1.  Activate WebStorm by launching the application and [logging in with your JetBrains credentials](https://sales.jetbrains.com/hc/en-gb/articles/208459025-Using-your-JetBrains-Account-to-activate-JetBrains-software).
1.  Install the `SonarLint` WebStorm plugin by going to `Preferences / Plugins / Browse Repositories`, searching for
    "sonar" and installing from the results.
1.  [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Running `git --version` from a command
    line on a Mac will prompt you to install it via Xcode Tools.
1.  [Install Node](https://nodejs.org/en/) version 6+ (LTS - Long Term Support).
1.  Clone this repository into the directory `/Users/[username]/Development/PDS/`.
1.  Set up the project's Git hooks by running `git config core.hooksPath .githooks` in the project directory. ([README](.githooks/README.md))
1.  Run `npm npm-install` ([npm-install script](docs/npm-scripts.md#npm-install)) from `/Users/[username]/Development/PDS/web-app/`.
1.  Run `npm start` ([start script](docs/npm-scripts.md#start)) from `/Users/[username]/Development/PDS/web-app/` to
    create a local dev server.
1.  The app will launch in the system default browser at [localhost:8000](http://localhost:8000/).
1.  Make edits, and the app will automatically update via HMR (Hot Module Reloading) on your local dev server.

## <a name="webstorm-idea-settings"/>WebStorm Settings

### TypeScript

You may need to turn on TypeScript support.

Go to `Preferences / Languages & Frameworks / TypeScript` and make sure "TypeScript Language Service" is checked.

### White Space

You can turn on a useful white space setting that will remove all trailing spaces on each line when a file is saved.

Go to `Preferences / Editor / General` and under the "Other" section, turn off "Always keep trailing spaces on caret
line" and set "Strip trailing spaces on Save" to "All".

## <a name="project-overview"/>Project Overview

### <a name="folder-structure"/>Folder Structure

-   **.githooks/** - Custom scripts that fire when certain Git actions occur.
-   **.idea/** - IntelliJ IDEA project files. Only files that contain common project settings should be checked into git.
    You may need to add specific files or subfolders to the .gitignore file when adding plugins, etc., to preven your
    user-specific customizations from being checked in.
-   **\_\_mocks\_\_/** - File/module mocks used by Jest for unit testing.
-   **dictionaries** - Project dictionary used by WebStorm/IDEA.
-   **coverage/** - Unit test code coverage results. See [test-coverage](docs/npm-scripts.md#test-coverage) script.
-   **dist/** - Distribution files are output here when building the project. Omitted from git.
-   **docs/** - Additional documentation about this project. There should be links to these files from the
    [Table of Contents](#table-of-contents).
-   **node_modules/** - Third party dependencies managed by npm. Omitted from git.
-   **out/** - TypeScript compiler output. Used only for [Static Analysis with Coverity](#docs/coverity.md).
    Omitted from git.
-   **public/** - Static files that will be transferred as-is to `dist/public` when building the project so that they can
    be served to the web app.
-   **src/** - Our project source code.
-   **swagger-codegen/** - Everything needed to [generate API Code](swagger-codegen/README.md).
-   **tslint-rules/** - Custom TSLint rules.
-   **.browserslistrc** - Single configuration for all tools (i.e. POSTCSS) that need to know what browsers are supported.
-   **.gitignore** - Hides files from git so that unwanted files are not checked in.
-   **.prettierignore** - Hide files from Prettier so that they are not processed.
-   **.prettierrc.json** - Prettier configuration file.
-   **.sass-lint.yml** - Sass-lint configuration file.
-   **ak-coverity.it.control-tec.com** - Auth key for Coverity. Necessary to run Coverity on Bamboo.
-   **jest.setup.ts** - Test environment initialization. [Scripts](docs/npm-scripts.md).
-   **package.json** - Defines what NPM modules our project depends on, and defines some useful [scripts](docs/npm-scripts.md).
-   **package-lock.json** - NPM package lock file that ensures the same version of every node module is consistently
-   **sonar-project.properties** - SonarQube configuration file.
-   **tsconfig.json** - Configuration file for the typeScript compiler.
-   **tslint.json** - Configuration file for tslint.
    installed every time.
-   **web-app.iml** - An Intellij IDEA project file.
-   **webpack.config.ts** - Webpack configuration file.

## <a name="code-validation"/>Code Validation

The following items will need to be completed/passing before committing any code and making a pull request. You can
perform all the following steps individually or you can run the [precommit](docs/npm-scripts.md#precommit)
script to run all three at once.

### Compiling

To quickly compile the project, run the [compile](docs/npm-scripts.md#compile) script.
Fix any compiler errors at this time.

### Linting

To quickly run lint, run the [lint](docs/npm-scripts.md#lint) script. Some issues can be automatically fixed by running
[lint-fix](docs/npm-scripts.md#lint-fix).

### Unit Tests

Run [test](docs/npm-scripts.md#test) and ensure all unit tests are passing.

### SonarQube Static Code Analysis

In order to run Static Code Analysis via SonarQube and publish the issues and the coverage metrics to
[SonarQube](https://sonarqube.control-tec.com), run the `static-analysis-sonarqube` npm task

## <a name="bem"/>BEM Methodology for CSS

BEM (Block, Element, Modifier) is a component-based approach to CSS styling. The idea behind it is to divide the
user interface into independently styled blocks. The official [BEM](https://en.bem.info/methodology/quick-start/)
website has a good introduction to the concepts.

NOTE: For this project, the [modified naming convention](http://getbem.com/naming/) is being used.

[Example of BEM in SASS](https://codepen.io/anon/pen/qoJqwz), and for reference: [The SASS Ampersand](https://css-tricks.com/the-sass-ampersand/).

## <a name="gotchas"/>Gotchas

This section contains miscellaneous things to look out for.

### Updating NPM Dependencies

When merging and/or checking out changes from another branch you will need to ensure that you run the
[npm-install](docs/npm-scripts.md#npm-install) script to install any dependencies you might not have in your branch.
If there are still issues present after running npm-install, you can try running
[npm-reinstall](docs/npm-scripts.md#npm-reinstall) to perform a complete fresh reinstall of all dependencies.
