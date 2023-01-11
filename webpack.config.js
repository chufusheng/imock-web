const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    context: resolve(__dirname, 'src'),
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.tsx'
        // the entry point of our app
    ],
    output: {
        filename: 'hotloader.js',
        // the output bundle
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },
    devtool: 'inline-source-map',
    resolve: {
        alias: { "stream": "stream-browserify" },
        fallback: { "path": require.resolve("path-browserify") },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", ".svg", ".md"]
    },

    devServer: {
        port: '8080',
        // Change it if other port needs to be used
        hot: true,
        // enable HMR on the server
        noInfo: false,
        quiet: false,
        // minimize the output to terminal.
        contentBase: resolve(__dirname, 'src'),
        // match the output path
        publicPath: '/',
        // match the output `publicPath`
        open: true
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(ts|tsx)?$/,
                loader: 'eslint-loader',
                exclude: [resolve(__dirname, "node_modules")],
            },
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [tsImportPluginFactory({
                                    libraryName: 'antd',
                                    libraryDirectory: 'es',
                                    style: 'css',
                                })]
                            }),
                            compilerOptions: {
                                module: 'es2015'
                            }
                        },
                    },
                ],
                // exclude: [resolve(__dirname, "node_modules")],
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: true,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        },
                    },
                    "css-loader"
                ]
            },
            { test: /\.png$/, use: ["url-loader"] },
            { test: /\.jpg$/, use: ["file-loader"] },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: "file-loader?name=assets/[name].[ext]"
            },
            { test: /\.md$/, use: "raw-loader" },
            { test: /\.json$/, use: "json-loader" },
            { test: /\.m?js/, type: "javascript/auto" }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        // new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({ template: resolve(__dirname, 'src/index.html') }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"]
        })
        // inject <script> in html file. 
    ],
};