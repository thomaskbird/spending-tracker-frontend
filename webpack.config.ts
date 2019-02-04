import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as autoprefixer from "autoprefixer";
import { JSONObject } from "src/json";

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
     * Base URL for Vehicle API requests.
     * If present, this overrides the default URL from the swagger document for this API.
     */
    vehicleApiBaseUrl?: string;

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
    publicStatic: "/public"
};

/**
 * config for webpack-dev-server
 */
const DEV_SERVER = {
    port: 8000,
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
    const packageJson: JSONObject = require(PATHS.root + "/package.json");

    return {
        cache: true,
        devtool: isSourceMap
            ? isDev
                ? "eval-source-map"
                : "source-map"
            : false,
        devServer: DEV_SERVER,
        context: PATHS.root,
        entry: [
            ...(isDev ? ["react-hot-loader/patch"] : []),
            isSandbox ? "./src/sandbox.tsx" : "./src/index.tsx"
        ],
        output: {
            filename: isDev ? "[name].js" : "[name].[chunkhash].js",
            path: PATHS.dist,
            publicPath: "/"
        },
        resolve: {
            alias: {
                src: PATHS.src
            },
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"]
        },
        module: {
            rules: [
                // CSS/SCSS
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: isSourceMap,
                                    importLoaders: 2,
                                    minimize: true
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
                            }
                        ]
                    })
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

                // typescript
                {
                    test: /\.tsx?$/,
                    include: PATHS.src,
                    use: [
                        ...(isDev ? ["react-hot-loader/webpack"] : []),
                        {
                            loader: "awesome-typescript-loader",
                            options: {
                                transpileOnly: true,
                                compilerOptions: {
                                    sourceMap: isSourceMap,
                                    target: "es5",
                                    isolatedModules: true,
                                    noEmitOnError: false
                                }
                            }
                        }
                    ]
                },

                // json
                {
                    test: /\.json$/,
                    include: PATHS.src,
                    use: ["json-loader"]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: isSandbox ? "The Sandbox" : "PDS Web App",
                template: PATHS.src + "/index.ejs",
                publicPath: URL_PATHS.publicStatic
            }),
            new ExtractTextPlugin({
                filename: "[name].[hash].css",
                allChunks: true,
                disable: isDev
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(
                        isDev ? "development" : "production"
                    ),
                    API_BASE_URL: JSON.stringify(env.apiBaseUrl),
                    VEHICLE_API_BASE_URL: JSON.stringify(env.vehicleApiBaseUrl),
                    AG_GRID_LICENSE_KEY: JSON.stringify(
                        "Control-Tec_PDS_Web_App_4Devs9_March_2019__" +
                            "MTU1MjA4OTYwMDAwMA==137d993909f4bf81fd198c6c37ee3d03"
                    ),
                    WEB_APP_VERSION: JSON.stringify(packageJson.version),
                    WEB_APP_COPYRIGHT_YEAR: JSON.stringify(String(2017))
                }
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: (module) =>
                    module.context &&
                    module.context.indexOf("node_modules") !== -1
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest"
            }),
            ...(isDev
                ? [
                      new webpack.HotModuleReplacementPlugin({
                          // NOTE: cannot use multiStep until this bug is fixed:
                          //       https://github.com/jantimon/html-webpack-plugin/issues/716
                          // multiStep: true // better performance with many files
                      }),
                      new webpack.NamedModulesPlugin()
                  ]
                : []),
            ...(isProd
                ? [
                      new CopyWebpackPlugin([
                          {
                              from: PATHS.publicStatic,
                              to: PATHS.dist + URL_PATHS.publicStatic
                          }
                      ]),
                      new webpack.optimize.UglifyJsPlugin({
                          beautify: false,
                          compress: true,
                          comments: false,
                          sourceMap: isSourceMap
                      })
                  ]
                : [])
        ]
    };
};
