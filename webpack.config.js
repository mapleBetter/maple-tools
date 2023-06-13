module.exports = {
  mode: 'production',
  entry: './index.ts',
  output: {
    filename: 'bundle.js'
  },
  optimization: {
    minimize: false
  },
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' }
    ]
  }
};
