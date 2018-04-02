module.exports = (isDev) => {
    return{
        preserveWhitespace: true,    //当写.vue文件时出现空格时会忽略掉。
        extractCSS: !isDev,   //单独全局的 的css代码打包。.vue文件的css文件不打包在一起，因为.vue文件当渲染到这个组件才会去加载这部分的代码。
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',   //生成一个独一无二的class命名
            camelCase: true     //生成驼峰命名法
        },
        //hotReload: false      //这个会使.vue文件的热重载功能关闭/
    }
}