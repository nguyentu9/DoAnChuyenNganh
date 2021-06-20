import { Router } from 'express'
import {
    fetchAllArticleWithRoleReviewer,
    fetchAllTypes,
} from '../controller/article.controller.js'
import { isAdmin, signIn } from '../middleware/auth.mdw.js'
import { Article } from '../models/articleModel.js'
import mongoose from 'mongoose'
import { statusObj, statusID } from '../services/generateArticleStatus.js'
const router = Router()

router.get('/', () => {})
router.get('/hot-articles', () => {})
router.get('/newsest-articles', () => {})
router.get('/types', fetchAllTypes)

router.get('/role/reviewer', signIn, fetchAllArticleWithRoleReviewer)

// [PUT] push status object into article's status
router.put(
    '/:articleID/status/role/editor',
    signIn,
    isAdmin,
    async (req, res) => {
        const { articleID } = req.params
        const { statusCode, message, reviewers } = req.body
        if (!statusCode || !statusObj[statusCode]) {
            return res.json({
                status: 404,
                message: 'Status code không tồn tại',
            })
        }
        console.log(statusObj[statusCode](message)) // <====

        if (
            [statusID.REQUIRES_EDITING, statusID.REJECT].includes(statusCode) &&
            message
        ) {
            try {
                await Article.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    { $push: { status: statusObj[statusCode](message) } }
                )
                let status = await Article.findOne(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    { status: 1 }
                )
                return res.json(status)
            } catch (e) {
                return res.json({
                    status: 404,
                    message: 'Không tìm thấy bài báo',
                })
            }
        }

        if (statusCode === statusID.SUBMITTED) {
            try {
                await Article.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    { $push: { status: statusObj[statusCode]() } }
                )
                let status = await Article.findOne(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    { status: 1 }
                )
                return res.json(status)
            } catch (e) {
                return res.json({
                    status: 404,
                    message: 'Không tìm thấy bài báo',
                })
            }
        }
        if (statusCode === statusID.INREVIEW && reviewers) {
            try {
                await Article.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    {
                        $push: {
                            status: statusObj[statusCode](),
                            reviewer: reviewers,
                        },
                        // $push: { reviewer: reviewers },
                    }
                )
                let status = await Article.findOne(
                    { _id: mongoose.Types.ObjectId(articleID) },
                    { status: 1 }
                )
                return res.json(status)
            } catch (e) {
                return res.json({
                    status: 404,
                    message: 'Không tìm thấy bài báo',
                })
            }
        }
    }
)

// [GET] fetch reviewers in a specification article
router.get(
    '/:articleID/reviewer/role/editor',
    signIn,
    isAdmin,
    async (req, res) => {
        const { articleID } = req.params

        try {
            let reviewers = await Article.findOne(
                { _id: mongoose.Types.ObjectId(articleID) },
                { reviewer: 1 }
            )
            return res.json(reviewers)
        } catch (e) {
            console.log(e)
        }
    }
)

router.put('/:articleID/status/role/reviewer', async (req, res) => {
    const { articleID } = req.params
    const { statusCode } = req.body
    // const userID = req.user.id
    if (!statusCode || !statusObj[statusCode]) {
        return res.json({
            status: 404,
            message: 'Status code không tồn tại',
        })
    }

    try {
        await Article.findOneAndUpdate(
            {
                _id: mongoose.Types.ObjectId(articleID),
            },
            {
                $push: { status: statusObj[statusCode]() },
            }
        )
        let status = await Article.findOne(
            {
                _id: mongoose.Types.ObjectId(articleID),
            },
            { status: 1 }
        )
        res.json(status)
        return
    } catch (e) {
        return res.json({
            status: 404,
            message: 'Không tìm thấy bài báo',
        })
    }
})

router.get('/:articleID/role/editor', signIn, isAdmin, async (req, res) => {
    const { articleID } = req.params
    try {
        let article = await Article.findOne(
            {
                _id: mongoose.Types.ObjectId(articleID),
            },
            {
                title: 1,
                type: 1,
                brief: 1,
                keyWord: 1,
                status: 1,
                author: 1,
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
})
router.get('/:articleID/role/reviewer', signIn, async (req, res) => {
    const { articleID } = req.params
    const reviewer = req.user.id
    try {
        let article = await Article.findOne(
            {
                _id: mongoose.Types.ObjectId(articleID),
                reviewer: { $elemMatch: { _id: reviewer } },
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
})

router.get('/role/editor', signIn, isAdmin, async (req, res) => {
    const { status, limit, skip } = req.query
    try {
        if (status === 'all') {
            let article = await Article.find(
                {},
                {
                    status: { $slice: -1 },
                    title: 1,
                    type: 1,
                    receivedDate: 1,
                    author: 1,
                    reviewer: 1,
                    updatedAt: 1,
                }
            )
            return res.json(article)
        }

        if (status === 'pending') {
            let article = await Article.find(
                { $or: [{ status: { $size: 1 } }, { status: { $size: 2 } }] },
                {
                    status: 1,
                    title: 1,
                    type: 1,
                    receivedDate: 1,
                    author: 1,
                    reviewer: 1,
                    updatedAt: 1,
                }
            )
            return res.json(article)
        }
        if (status === 'revised') {
            return res.json([])
        }
        if (status === 'published') {
            return res.json([])
        }
        if (status === 'disagree') {
            return res.json([])
        }
    } catch (e) {
        console.log(e)
    }
})

// [GET] Fetch single article with corresponding role
router.get('/:articleID/role/:userRole', signIn, async (req, res) => {
    const { userRole, articleID } = req.params
    if (userRole === 'author') {
        try {
            const exitsArticleID = await Article.findOne(
                {
                    _id: mongoose.Types.ObjectId(articleID),
                },
                { _id: 1 }
            )
        } catch (e) {
            return res.json({
                status: 404,
                message: 'Không tìm thấy bài báo',
            })
        }

        try {
            const article = await Article.findOne(
                {
                    $and: [
                        { 'author.0._id': req.user.id },
                        { _id: mongoose.Types.ObjectId(articleID) },
                    ],
                },
                {
                    title: 1,
                    type: 1,
                    brief: 1,
                    keyWord: 1,
                    status: 1,
                    author: 1,
                    attachments: 1,
                    receivedDate: 1,
                }
            )
            if (!article) {
                return res.json({
                    status: 404,
                    message: 'Không tìm thấy bài báo',
                })
            }
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }
})

// Fetch all article with corresponding role
router.get('/role/author', signIn, async (req, res) => {
    const { userRole } = req.params
    if (userRole === 'author') {
        try {
            const article = await Article.find(
                { 'author.0._id': req.user.id },
                { status: { $slice: -1 }, title: 1, type: 1, receivedDate: 1 }
            )
            return res.json(article)
        } catch (e) {
            console.log(e)
        }
    }
})

export default router
