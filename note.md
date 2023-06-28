# 项目初始化

```shell
git init
touch .gitignore

npm init -y
或
yarn init -y
```

# 构建工具

```shell
# webpack
yarn add -D webpack webpack-cli
touch webpack.config.js

# babel
yarn add -D @babel/core @babel/preset-env
yarn add -D babel-loader
touch .babelrc

# nodemon 
yarn add -D nodemon
touch nodemon.json

# 监听修改->打包->运行
```

```javascript
// package.json.scripts

"start": "node dist/app.js",					// 运行打包后的
"build": "webpack && node dist/app.js",			// 打包并运行
"dev":"babel src -d dev && node dev/app.js",	// 转为node可运行,不打包
"watch": "nodemon --exec yarn run"				// nodemon自动重启，需接 dev/build
```



# 搭建项目

```shell
# koa,koa-router
yarn add koa koa-router koa-bodyparser

# mongoose
yarn add mongoose
```

## koa-router

```javascript
import Koa from "koa";
import Router from "koa-router";

// 实例化
const app = new Koa();
const home = new Router();

// 方式1 
// home.get：url匹配'/'，执行相应函数
home.get('/',(ctx,next)=>{
    // 后续会把这个函数注册成中间件
    ctx.body = 'index页面'
})

// 方式2
// home.use：使用中间件
import page from "page.js";
home.use(page,page.routes())				//访问localhost:8000/page
home.use('/home',page.routes())				//访问localhost:8000/home/page


// app.use()：添加中间件
// home.routes()组装合并home上所有路由，【返回一个合并好的中间件】
app.use(home.routes())

// 自动丰富response响应头：
app.use(router.allowedMethods())

app.listen(8000)
```

```javascript
// page.js 
import Router from "koa-router";
const page = new Router();
page.get('/page',(ctx)=>{
    ctx.body = 'page页面'
})
```





