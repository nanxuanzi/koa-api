import db from "mongoose";
import {mongodb} from "../config/default";
// 连接数据库
db.connect(mongodb.url)
    .then(()=>{
        console.log('数据库连接成功');        
    })
    .catch((err)=>{
        console.log('数据库连接失败');
    })
