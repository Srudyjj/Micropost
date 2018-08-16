const path = require('path');


module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './src/app.js',
      './index.html',
      './bootswatch.css'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'app.bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'stage-0']
      }},
      {
        test: /\.html?$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: "file-loader",
          options: {
            name: "[name].html?[hash:8]"
          }
        }]
      },
      {
        test: /\.css?$/,
        use: [
          {
            loader: "restyle-loader"
          },
          {
            loader: "file-loader",
            options: {
              name: "[name].css?[hash:8]"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
}
