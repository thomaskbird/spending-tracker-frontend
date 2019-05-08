import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import autoprefixer from "autoprefixer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

/**
 * Interface for supported "env" properties, which come from "--env.[propname]=[value]" command-line arguments.
 */
interface Env {
    /**
     * Treated as a boolean: any non-empty value == true.
     * True to build for production (generates dist files).
     * False to build for development (for use with webpack-dev-server with hot module reloading)
     */
    prod?: string;

    /**
     * Treated as a boolean: any non-empty value == true.
     * True to generate source maps for debugging.
     * Only relevant if {@link #prod} is true.
     * Source maps are ALWAYS generated when {@link #prod} is false.
     */
    sourceMap?: string;

    /**
     * Base URL for API requests.
     * If present, this overrides the default URL from the swagger document for this API.
     */
    apiBaseUrl?: string;

    /**
     * The relative path from root of the static web server's directory to the
     * directory containing this web application.
     *
     * Only used if {@link #prod} is true and it is necessary to deploy the
     * web app in a sub-directory in a production environment.
     *
     * This path must not contain any leading or trailing slashes and must be
     * empty/undefined if the web app is served from the root of the static web server.
     */
    webAppRootPath?: string;

    /**
     * Treated as a boolean: any non-empty value == true.
     * True to build the sandbox application instead of the main web application.
     */
    sandbox?: string;
}

/**
 * Various file path constants.
 * All values are absolute paths.
 */
const PATHS = {
    /**
     * Project root.
     */
    root: path.resolve(__dirname, "./"),
    /**
     * "node_modules" folder.
     */
    nodeModules: path.resolve(__dirname, "./node_modules"),
    /**
     * Project source folder.
     */
    src: path.resolve(__dirname, "./src"),
    /**
     * Folder containing public static assets that should be copied directly to the
     * {@link #dist}/{@link URL_PATHS.publicStatic} folder
     */
    publicStatic: path.resolve(__dirname, "./public"),
    /**
     * Build output folder.
     */
    dist: path.resolve(__dirname, "./dist")
};

/**
 * Absolute URL paths.
 */
const URL_PATHS = {
    /**
     * Path to location of public static files to be served.
     */
    publicStatic: "public"
};

/**
 * List of names of NPM modules that need to be transpiled.
 * Some NPM packages are distributed as ES modules only (not ES5 CommonJS modules),
 * so they must be transpiled.
 */
const NODE_MODULES_TO_TRANSPILE = ["query-string"];

/**
 * config for webpack-dev-server
 */
const DEV_SERVER = {
    port: 8075,
    hot: true,
    hotOnly: false,
    overlay: true,
    historyApiFallback: true
};

// Default export is necessary for webpack.config.ts
// tslint:disable-next-line:no-default-export
export default (env: Env = {}) => {
    const isSandbox = !!env.sandbox;
    const isDev = !env.prod;
    const isProd = !isDev;
    const isSourceMap = isDev || !!env.sourceMap;
    // const packageJson: JSONObject = require(PATHS.root + "/package.json");
    const webAppRootPath =
        !isDev && env.webAppRootPath ? `/${env.webAppRootPath}/` : "/";

    return {
        mode: isDev ? "development" : "production",
        cache: true,
        devtool: isSourceMap
            ? isDev
                ? "eval-source-map"
                : "source-map"
            : false,
        devServer: DEV_SERVER,
        context: PATHS.root,
        entry: [isSandbox ? "./src/sandbox.tsx" : "./src/index.tsx"],
        output: {
            filename: isDev ? "[name].js" : "[name].[chunkhash].js",
            path: PATHS.dist,
            publicPath: webAppRootPath
        },
        resolve: {
            alias: {
                src: PATHS.src
            },
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"]
        },
        optimization: {
            minimizer: [
                new TerserWebpackPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: isSourceMap
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        module: {
            rules: [
                // CSS/SCSS
                {
                    test: /\.s?css$/,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isSourceMap
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: isSourceMap,
                                ident: "postcss",
                                plugins: [autoprefixer()]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isSourceMap
                            }
                        },
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: [
                                    path.resolve(
                                        __dirname,
                                        "src/components/sass/variables.scss"
                                    ),
                                    path.resolve(
                                        __dirname,
                                        "src/components/sass/mixins.scss"
                                    )
                                ]
                            }
                        }
                    ]
                },

                // image/font files included by CSS
                {
                    test: /\.(woff|woff2|eot|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024
                            }
                        }
                    ]
                },

                // typescript/javascript
                {
                    test: /\.[tj]sx?$/,
                    include: [
                        PATHS.src,
                        ...NODE_MODULES_TO_TRANSPILE.map(
                            (moduleName) => `${PATHS.nodeModules}/${moduleName}`
                        )
                    ],
                    use: [
                        ...(isDev
                            ? [
                                  // cache-loader/thread-loader combo is supposed to optimize rebuilds.
                                  // As suggested by ts-loader's README
                                  { loader: "cache-loader" },
                                  {
                                      loader: "thread-loader",
                                      options: {
                                          // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                                          workers:
                                              require("os").cpus().length - 1
                                      }
                                  }
                              ]
                            : []),
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
                                happyPackMode: isDev,
                                compilerOptions: {
                                    // preserve original "esNext" style imports so that Babel
                                    // can process imports correctly for the purpose of
                                    // babel-plugin-macros
                                    module: "esNext",
                                    sourceMap: isSourceMap,
                                    isolatedModules: true,
                                    noEmitOnError: false
                                }
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: isSandbox
                    ? "The Sandbox"
                    : "React Typescript Boilerplate",
                template: PATHS.src + "/index.ejs",
                publicPath: webAppRootPath + URL_PATHS.publicStatic
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "[name].css" : "[name].[hash].css",
                chunkFilename: isDev ? "[id].css" : "[id].[hash].css"
            }),
            ...(isProd
                ? [
                      new CopyWebpackPlugin([
                          {
                              from: PATHS.publicStatic,
                              to: `${PATHS.dist}/${URL_PATHS.publicStatic}`
                          }
                      ])
                  ]
                : [
                      new ForkTsCheckerWebpackPlugin({
                          checkSyntacticErrors: true,
                          formatter: "codeframe"
                      })
                  ])
        ]
    };
};
