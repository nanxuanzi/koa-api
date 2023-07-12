import mongoose from "../db/index";

// const post = new mongoose.Schema({
//     title: String,
//     sites: [String],
//     date:{
//         type:Date,
//         default:Date.now()
//     }
// });
const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    post: {
        title:String,
        sites:[String],
        date:{
            type:Date,
            default: Date.now()
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }

});


const PostModel = new mongoose.model('posts', PostSchema);

export default PostModel
// PostModel.create({
//     author: '南轩子',
//     post: {
//         title: 'title',
//         sites: ['title']
//     }
// })
// const a = async () => {
//     const find = await PostModel.findOneAndUpdate({ author: 'dpadp' }, { post:{sites: ['t', 'e', 's', 't'],date:Date.now()}})
//     console.log(find);
// }
// a()

