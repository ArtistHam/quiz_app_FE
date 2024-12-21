const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/images", to: "images" }, // копируем папку images из public в dist/images
      ],
    }),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
