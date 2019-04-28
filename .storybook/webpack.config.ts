import * as path from "path";
import * as webpack from "webpack";
import autoprefixer from "autoprefixer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { ObjectMap } from "src/types";

/**
 * Storybook Webpack Configuration
 *
 * Storybook uses its own config but it is necessary to override some properties
 * to match certain aspects of the project config (how files are loaded and
 * processed).
 */
// Default export is necessary for webpack.config.ts
// tslint:disable-next-line:no-default-export
export default (
    baseConfig: webpack.Configuration,
    env: ObjectMap<string>,
    defaultConfig: webpack.Configuration
) => {
    defaultConfig.module!.rules!.push(
        {
            test: /\.tsx?$/,
            use: [
                // cache-loader/thread-loader combo is supposed to optimize rebuilds.
                // As suggested by ts-loader's README
                { loader: "cache-loader" },
                {
                    loader: "thread-loader",
                    options: {
                        // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                        workers: require("os").cpus().length - 1
                    }
                },
                {
                    // Use Babel after the TypeScript compiler to get some
                    // extra functionality not available in plain TypeScript/Webpack
                    loader: "babel-loader",
                    options: {
                        plugins: ["macros"]
                    }
                },
                {
                    loader: "ts-loader",
                    options: {
                        // happyPackMode = no compiler checks and compatible with thread-loader.
                        // fork-ts-checker-webpack-plugin will separately run compiler checks in dev mode.
                        happyPackMode: true,
                        compilerOptions: {
                            // preserve original "esNext" style imports so that Babel
                            // can process imports correctly for the purpose of
                            // babel-plugin-macros
                            module: "esNext",
                            sourceMap: true,
                            isolatedModules: true,
                            noEmitOnError: false
                        },
                        transpileOnly: true
                    }
                },
                "react-docgen-typescript-loader"
            ]
        },
        {
            test: /\.s?css$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        plugins: [autoprefixer()],
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-resources-loader",
                    options: {
                        resources: [
                            path.resolve(
                                __dirname,
                                "../node_modules/@blueprintjs/core/lib/scss/variables.scss"
                            ),
                            path.resolve(
                                __dirname,
                                "../src/styles/base-variables.scss"
                            )
                        ]
                    }
                }
            ]
        }
    );
    defaultConfig.resolve!.plugins = [
        // importing the project tsconfig.json so this config can be shared with storybook.
        new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, "../tsconfig.json")
        })
    ];
    defaultConfig.resolve!.extensions!.push(".ts", ".tsx");
    defaultConfig.plugins!.push(
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            formatter: "codeframe"
        })
    );
    return defaultConfig;
};
