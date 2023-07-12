import mongoose, { mongo } from "mongoose";
import { mongodb } from "../config/default";


mongoose.connect(mongodb.url)
    .then(()=>{
        console.log('数据库连接成功!'); 
    })
    .catch((err)=>{
        console.log('数据库连接失败！');
    })

export default mongoose

// 定义一个数据模型

// // 连接数据库
// mongoose.connect(mongodb.url,{ useNewUrlParser: true })
//     .then(()=>{
//         console.log('数据库连接成功');        
//     })
//     .catch((err)=>{
//         console.log('数据库连接失败');
//     })

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(mongodb.url);

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// mongoose.connect(mongodb.url);


// // 创建Schema，
// const kittySchema = new mongoose.Schema({
//     name: String
// });

// // 创建模型（model），users为操作的集合
// const kitten = mongoose.model('users', kittySchema);

// // 为users添加数据
// const silence = new kitten({ name: "猫叫" })

// const a = silence.save()
// console.log(a);

// const b =  kitten.findOne({name:'nanxuanzi'})
// console.log(b);

