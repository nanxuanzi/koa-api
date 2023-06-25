import Koa from "koa";
import {port} from "./config/default";
const app = new Koa();

app.use(async (ctx) =>{
    ctx.body = ctx.request
})
app.listen(port,()=>{
    console.log('你好!!');
    console.log(`运行成功http://localhost:${port}`);
})