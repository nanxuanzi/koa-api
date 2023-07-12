import bcrypt from "bcryptjs";
// 模块
import UserModel from "../models/User";
import { ResData, JwtSign } from "../utils";


/**
 * 用户查询 /u?name=name
 */
export const getUser = async ctx => {
    const { name } = ctx.request.query
    const findResult = await UserModel.find({ name})
    if (findResult.length == 0) {
        new ResData().set(ctx, -1, '用户不存在')
    } else {
        new ResData().set(ctx, 1, '查询成功', {
            name: findResult[0].name,
            // email: findResult[0].email,
            date: findResult[0].date
        })
    }
}

/**
 * 用户注册
 */
export const register = async ctx => {
    const { name, password, email } = ctx.request.body

    // 正则验证用户名和邮箱
    const regName = /^[a-zA-Z0-9_]{4,16}$/
    const regEmail = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/
    // 用户名或邮箱不符合
    if (regName.test(name) != true || regEmail.test(email) != true) {
        new ResData().set(ctx, -1, '用户名或邮箱不符合')
    }
    // 符合
    else {
        // 查询username,email是否存在,返回数组
        const findName = await UserModel.find({ name })
        const findEmail = await UserModel.find({ email })

        if (findName.length > 0 || findEmail.length > 0) {
            new ResData().set(ctx, -1, '用户名或邮箱已经存在')
        } else {
            // 对密码进行加密
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const addUser = await UserModel.create({ name: name, password: hash, email })
            if (addUser) {
                new ResData().set(ctx, 1, `用户:${name}创建成功`)
            }
        }
    }
}

/**
 * 用户登录,返回token
 */
export const login = async ctx => {
    const { name, password } = ctx.request.body
    // 参数校验有效性

    // 查询是否有该用户
    const findResult = await UserModel.find({ name })
    if (findResult.length == 0) {
        new ResData().set(ctx, -1, '用户不存在')
    } else {
        // 校验密码
        const check = bcrypt.compareSync(password, findResult[0].password)

        //验证成功返回token 
        if (check) {
            // 返回token
            const token = new JwtSign().set({ id: findResult[0]._id, name }, '2h')
            new ResData().set(ctx, 1, '登录成功', { token: `Bearer ${token}` })
        } else {
            new ResData().set(ctx, -1, '登录失败')
        }
    }
}


/**
 * 修改密码 /u/:name
 */
export const updateUser = async ctx => {

    // 接收参数
    const name = ctx.params.name
    const { password, newpassword } = ctx.request.body

    // 验证token

    // 查询用户是否存在再验证密码
    const data = await UserModel.findOne({ name })
    if (data) {
        // 验证密码
        const ps = bcrypt.compareSync(password, data.password); // true

        // 验证成功则修改密码
        if (ps) {
            // 加密新密码
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newpassword, salt)
            const update = await UserModel.findOneAndUpdate({ name }, { password: hash }, { new: true })
            if (update) {
                new ResData().set(ctx, 1, '修改密码成功')
            }
            else {
                new ResData().set(ctx, -1, '密码修改失败')
            }
        } else {
            new ResData().set(ctx, -1, '密码验证失败')
        }
    } else {
        new ResData().set(ctx, -1, '用户不存在')
    }
}

/**
 * 删除用户
 */
export const deleteUser = async ctx => {
    const name = ctx.params.name
    const { password, email } = ctx.request.body

    // 查询用户是否存在
    const data = await UserModel.findOne({ name, email })
    if (data) {
        // 验证密码
        const ps = bcrypt.compareSync(password, data.password); // true/false
        // 如果验证密码成功
        if (ps) {
            const deleteUser = await UserModel.deleteOne({ name })
            if (deleteUser.deletedCount > 0) {
                new ResData().set(ctx, 1, '用户删除成功')
            } else {
                new ResData().set(ctx, -1, '用户删除失败')
            }
        } else {
            new ResData().set(ctx, -1, '密码验证失败')
        }
    } else {
        new ResData().set(ctx, -1, '用户不存在')
    }

}