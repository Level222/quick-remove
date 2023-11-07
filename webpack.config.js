const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    "background": "./src/background/index.ts",
    "content-script": "./src/content-script/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    })
  ],
  resolve: {
    extensions: [".ts", "..."],
  },
  ...isProduction
    ? {}
    : { devtool: "inline-cheap-module-source-map" }
};
