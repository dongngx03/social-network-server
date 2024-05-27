
import prismaDb from "../configs/prismaDb"


class CommentService {
    static async create(
        {
            post_id,
            source_id,
            comment_content,
            parent_comment_id
        }: {
            post_id: number,
            source_id: number,
            comment_content: string,
            parent_comment_id?: number
        }
    ) {
        const newComment = await prismaDb.comment.create({
            data: {
                postId: post_id,
                sourceId: source_id,
                commentContent: comment_content,
                parentCommentId: parent_comment_id ? parent_comment_id : 0
            }
        })

        return newComment
    }

    static async delete(comment_id: number) {
        const delC = await prismaDb.comment.delete({
            where: {
                id: +comment_id
            }
        })

        return delC
    }

    static async update(comment_id: number, body: any) {
        const updateC = await prismaDb.comment.update({
            where: { id: +comment_id },
            data: body
        })

        return updateC
    }

    static async getAllCommentParentFromOnePost(post_id: number) {
        const allC = await prismaDb.comment.findMany({
            where: {
                AND: [
                    { postId: +post_id },
                    { parentCommentId: 0 }
                ]
            },
            include: {
                comments: true
            }
        })

        return allC
    }

    static async getAllCommentChildrenFromParent(post_id: number, parent_comment_id: number) {
        const allC = await prismaDb.comment.findMany({
            where: {
                AND: [
                    { parentCommentId: +parent_comment_id }
                ]
            }
        }) 

        return allC
    }

}

export default CommentService