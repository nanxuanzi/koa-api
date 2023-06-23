import Koa from "koa";

const app = new Koa();

app.use(async (ctx) =>{
    ctx.body = ctx.request
})
app.listen(8000,()=>{
    console.log('你好!!');
    console.log('运行成功\nhttp://localhost:8000');
})