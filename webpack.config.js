
const path = require('path');

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        app: './app.js',
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
    },
    mode: "development",
};