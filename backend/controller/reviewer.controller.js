import mongoose from 'mongoose'
import { Article } from '../models/articleModel.js'
import { UserDetail } from '../models/userDetailModel.js'

export const fetchAllReviewer = async (req, res, next) => {
    const { articleID } = req.query

    try {
        const { author } = await Article.findOne(
            { _id: mongoose.Types.ObjectId(articleID) },
            { 'author._id': 1 } // return data like [{"_id":"36058860f"},{"_id":"bdfc802d"}]
        )
        const reviewersExlude = author.map((i) => i._id)

        const reviewers = await UserDetail.find(
            { _id: { $nin: reviewersExlude } },
            { fullName: 1, org: 1, major: 1, email: 1 }
        )
        res.json(reviewers)
    } catch (e) {
        console.log(e)
    }
}
