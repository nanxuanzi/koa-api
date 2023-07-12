import mongoose from "../db/index";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,       //类型：字符
        required: true,     //必填项
        unique: true        //唯一值
                            //default:'s',默认值s
                            //enum:['男','女'] 枚举值:男/女
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

// 以数据模型创建一个模型实例User,users为集合名，usersSchema为添加数据格式
const UserModel = new mongoose.model('users', UserSchema);

export default UserModel

// 插入数据方法1
// userModel.create({
//     username: '南轩仔iiiz'
// })

// 插入数据方法2
// // 使用模型新增数据
// const user = new User({
//     name:'南轩子',
//     age:'11'
// });
// // save方法保存到数据库
// user.save()


// // 查询user集合/表
// User.findOne({name:'南轩子'}).then((data)=>{
//     console.log(data.name);
// })


// 查询并修改
// UserModel.findOneAndUpdate({ username }, { password: hash }, { new: true })

// 删除
// UserModel.deleteOne({ username})