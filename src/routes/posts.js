import Router from "koa-router";
import { getPost, uploadPost, updatePost,deletePost } from "../controllers/posts";

const post = new Router();

/**
 * 搜索帖子(post)
 * @route   GET     /p?title=title
 */
post.get('/p',getPost)

/**
 * 提交帖子
 * @route   POST    /p
 * @access  需要验证token
 */
post.post('/up',uploadPost)


/**
 * 修改帖子
 * @route   PUT /p:_id
 * @access  需要验证token
 */
post.put('/p/:id',updatePost)
/**
 * 删除帖子
 * @route   DELETE  /p:_id
 * @access  需要验证token
 */
post.delete('/p/:id',deletePost)

export default post.routes()