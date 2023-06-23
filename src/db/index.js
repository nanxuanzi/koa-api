import db from "mongoose";

// 连接数据库
db.connect("mongodb+srv://nanxuanzicode:nanxuanzicode@jiqun.wui5uu4.mongodb.net/test?retryWrites=true&w=majority")
    .then(()=>{
        console.log('数据库连接成功');        
    })
    .catch((err)=>{
        console.log('数据库连接失败');
    })