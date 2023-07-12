import { secret } from "../config/default";
import jwt from "jsonwebtoken";
/**
 * 统一设置、发送响应体
 * @class
 */
export class ResData {
    /**
     * 设置响应数据并发送
     * @param {Object} ctx   上下文对象
     * @param {number} code  业务码[0,1,-1]
     * @param {string} msg   信息
     * @param {...any} data  数据(json)-可选
     */
    set(ctx, code, msg, ...data) {
        const res = { code, msg }
        if (data.length != 0) {
            res['data'] = data[0]
        }
        ctx.response.body = res
    }
}

/**
 * jwt生成token
 * @class
 */
export class JwtSign {
    /**
     * 
     * @param {*} data 加密的数据
     * @param {*} time 有效时长，1000为1000s，'1h'为1小时，'1d'为1天
     * @returns 
     */
    set(data, time) {
        const token = jwt.sign(data, secret, { expiresIn: time })
        return token
    }
}

















/**
 * @deprecated
 * 返回统一响应体
 * @param {Object} ctx  上下文对象
 * @param {number} code 响应码
 * @param {string} msg  响应信息
 * @param {...any} data 响应数据,json格式
 */
// export function ResData(ctx, code, msg, ...data) {
//     const res = {
//         code,
//         msg
//     }
//     if (data.length != 0) {
//         res['data'] = data[0]
//     }
//     ctx.response.body = res
// }
