import { ResData } from "../utils"
import PostModel from "../models/Post";


// 获取posts
export const getPost = async ctx => {
    // 获取title
    const { title } = ctx.request.query
    // 查询title
    const findResult = await PostModel.find({ 'post.title': title })
    if (findResult.length > 0) {
        const data = []
        await findResult.forEach(e => {
            const { _id, author, post, date } = e
            const apost = {
                id: _id,
                author,
                post,
                date
            }
            data.push(apost)
        });
        new ResData().set(ctx, 1, '查询成功', data)
    } else {
        new ResData().set(ctx, -1, '查询失败')
    }
}

// 上传posts    /up 
export const uploadPost = async ctx => {
    const { author, title, sites } = ctx.request.body

    // 验证token
    const create = await PostModel.create({
        author,
        post: {
            title,
            sites
        }
    })
    if (create.length > 0) {
        new ResData().set(ctx, 1, '提交成功')
    } else {
        new ResData().set(ctx, -1, '提交失败')
    }

    // } else {
    //     new ResData().set(ctx, -1, 'token验证失败')
    // }

}

// 修改posts    /p/:id
export const updatePost = async ctx => {
    const id = ctx.params.id
    const { author, title, sites } = ctx.request.body

    // 是否存在id
    const findResult = await PostModel.find({ _id: id })

    // 存在则修改
    if (findResult.length > 0) {
        // 验证token
        const { name } = ctx.state.user
        if (author === name) {
            const updateResult = await PostModel.findOneAndUpdate({ _id: id }, { author, post: { title, sites, date: Date.now() } }, { new: true })
            if (updateResult) {
                new ResData().set(ctx, 1, '修改成功')
            } else {
                new ResData().set(ctx, -1, '修改失败')
            }
        } else {
            new ResData().set(ctx, -1, 'token验证失败')
        }
    } else {
        new ResData().set(ctx, -1, 'id不存在')
    }

}

// 删除帖子 /p/:id
export const deletePost = async ctx => {
    const id = ctx.params.id
    // 查询是否存在id
    const findResult = await PostModel.find({ _id: id })

    // 存在则进一步验证token
    
    if (findResult.length > 0) {
        // 验证token
        const { name } = ctx.state.user
        if (author === name) {
            const deleteResult = await PostModel.deleteOne({ _id: id })

            if (deleteResult.deletedCount == 1) {
                new ResData().set(ctx, 1, '删除成功')
            } else {
                new ResData().set(ctx, -1, '删除失败')
            }
        } else {
            new ResData().set(ctx, -1, 'token验证失败')
        }
    } else {
        new ResData().set(ctx, -1, 'id不存在')
    }

}