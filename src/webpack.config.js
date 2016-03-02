module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'stylist.js',
        library: 'Stylist',
        libraryTarget: 'umd',
        path: './build'
    },
    module: {
        loaders: [
            {
                exclude: ['node_modules', 'test'],
                loader: 'babel',
                test: /\.js$/
            }
        ]
    }
};
