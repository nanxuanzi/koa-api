const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target:"node",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets:{
                                        node:"current"
                                    }
                                }
                            ]
                        ],
                        plugins: []
                    }
                }
            }
        ]
    }
};