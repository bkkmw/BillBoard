const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    // 생략
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: false,
            REACT_APP_KAKAO_API_KEY: process.env.REACT_APP_KAKAO_API_KEY,
        }),
    ],
    // 생략
};