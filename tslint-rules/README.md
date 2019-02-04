## TSLint Rules

The `src/` folder contains source code for custom TSLint rules for our project.

The `compiled/` folder contains compiled output for the custom TSLint rules, which is needed by TSLint to run the rules.

Only modify files in the `src/` folder, then run the `compile-tslint-rules` NPM script to compile changes.

Both folders are checked into GIT so that we don't have to always compile the rules before using them.  