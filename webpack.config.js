const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry:"./src/index.ts",
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js' ,

        // 告诉webpack不适用箭头函数
        environment:{
            arrowFunction:false,
            const:false
        }
    },
 
    module:{
        rules:[{
            test:/\.ts$/,
            use:[
                {
                    // 设置babel
                    loader:'babel-loader',
                    options:{
                        // 设置预定义的环境
                        presets:[
                            [
                                // 指定环境的插件
                            "@babel/preset-env",
                            // 配置信息
                            {
                                // 要兼容的目标浏览器
                                targets:{
                                    chrome:'88'
                                },
                                // 指定corejs（js运行环境，为了兼容老的浏览器，比如使用promise，老版本的浏览器没有，corejs里面有，则会直接引用corejs里的promise）的版本
                                "corejs":"3",
                                // 使用corejs的方式"usage"，表示按需加载
                                "useBuiltIns":"usage"
                            }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ], // 加载器是从后往前执行
            exclude:/node_modules/
        },{
            test:/\.less$/,
            use:[
                'style-loader',
                'css-loader',
                // 引入postcss
                {
                    loader:'postcss-loader',
                    options:{
                        postcssOptions:{
                            plugins:[
                                [
                                    "postcss-preset-env",
                                    {
                                        browsers:'last 2 versions'
                                    }
                                ]
                            ]
                        }
                    }
                },
                'less-loader'
            ]

        }] 
    },

    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:'./src/index.html'
        })
    ],

    resolve:{
        extensions:['.ts','.js']
    }
} 