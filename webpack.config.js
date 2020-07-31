const path = require('path');

module.export = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'publick')    
    },
    devtool: 'source-map'
};