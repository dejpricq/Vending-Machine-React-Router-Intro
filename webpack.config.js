const CleanWebpackPlugin = require("clean-webpack-plugin"); 
const HTMLWebpackPlugin = require("html-webpack-plugin");
var nodeExternals = require('webpack-node-externals');
const path = require("path"); 

module.exports = {
    mode: 'production',
    devtool: "source-map",
    entry  : "./src/scripts/app.js",     
    output : {
        path: __dirname,
        publicPath: "/",
        filename : "bundle.js"
    },
    module: {
        rules: [
            {
                test    : /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader  : "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }   
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use: [
            //       'file-loader'
            //     ]
            // },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'img/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]
    },
    // externals: [nodeExternals()],
    plugins :[
        new CleanWebpackPlugin("dist"),
        new HTMLWebpackPlugin({
            filename: "index.html",
            title: "React-TDD",
            mainDiv: "welcome-message",
            template: "src/index.html"
        })
    ]
};