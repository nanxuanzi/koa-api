import Koa from "koa";
import Router from "koa-router";
import bodyparser from "koa-bodyparser";
import koajwt from "koa-jwt";
// import passport, { session } from "koa-passport";

// config
import { port, secret } from "./config/default";
// util
import { ResData } from "./utils/index";
// routes()
import users from "./routes/users";
import posts from "./routes/posts";

const app = new Koa();
const router = new Router();


app.use(bodyparser())


app.use(async (ctx, next) => {
  await next()
  if (ctx.status == 404) {
    ctx.status = 404
    new ResData().set(ctx, 0, '请求资源不存在')
  }
})

// 如果不在白名单内则返回401，401优先级高于404
app.use(koajwt({
  secret: secret
}).unless({ // 配置白名单
  // ['/login','/p','/u']
  path: [/^\/login/,/^\/p$/,/^\/u$/]
}))

// 路由使用其他路由中间件
router
  .use(users)
  .use(posts)

// app注册组装后的路由中间件，丰富response响应头
app.use(router.routes()).use(router.allowedMethods())

// listen
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})