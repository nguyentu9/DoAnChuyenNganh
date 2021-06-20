import { Article } from '../models/articleModel.js'
import { Type } from '../models/typeModel.js'

export const fetchAllTypes = async (req, res) => {
    try {
        const types = await Type.find()
        res.json(types)
    } catch (err) {
        console.error(err)
    }
}

export const fetchAllArticleWithRoleReviewer = async (req, res) => {
    const reviewer = req.user.id
    try {
        let article = await Article.find(
            {
                reviewer: {
                    $elemMatch: { _id: reviewer },
                },
            },
            {
                title: 1,
                type: 1,
                brief: 1,
                keyWord: 1,
                status: 1,
                attachments: 1,
                receivedDate: 1,
            }
        )
        return res.json(article)
    } catch (e) {
        return res.json({
            status: 404,
            message: 'Không tìm thấy bài báo',
        })
    }
}
