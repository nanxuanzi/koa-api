import Router from "koa-router";
import { deleteUser, getUser, login, register, updateUser } from "../controllers/users";

const user = new Router();


/**
 * 用户查询
 * @route   POST    /u?name=name
 */
user.get('/u',getUser)


/**
 * 用户注册
 * @route   POST    /u 
 */
user.post('/u',register)

/**
 * 用户登录
 * @route   POST    /login
 */
user.post('/login',login)



/**
 * 用户修改密码
 * @route   PUT    /u/:name
 * @access  需要验证token
 */
user.put('/u/:name',updateUser)

/**
 * 用户注销
 * @route   DELETE  /u/:name
 * @access  需要验证token
 */
user.delete('/u/:name',deleteUser)

export default user.routes()