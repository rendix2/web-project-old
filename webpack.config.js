const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

module.exports = (env, args) => {
    const isProduction = args.mode === 'production';

    return {
        context: path.resolve(__dirname),
        entry: {
            app: './www/scripts/app.js',
            bootstrap: './www/scripts/bootstrap.js',
            fontawesome: './www/scripts/fontawesome.js',
        },
        output: {
            path: path.join(__dirname, './www/dist'),
            publicPath: isProduction ? '/dist/' : '/',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
                },
                {
                    test: require.resolve("jquery"),
                    loader: "expose-loader",
                    options: {
                        exposes: ["$", "jQuery"],
                    },
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
        ],
        devServer: {
            contentBase: path.join(__dirname, './www/dist'),
            port: 3060,
        },
    };
};