const path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/Entry.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      },
      {
        include: [
          path.resolve(__dirname, 'js'),
          path.resolve(__dirname, 'jsx'),
          path.resolve('node_modules/preact-compat/src'),
        ],
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false, // Please don't inline the image
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
}
