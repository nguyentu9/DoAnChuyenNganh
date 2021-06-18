import { Router } from 'express'
import { fetchAllTypes } from '../controller/article.controller.js'
import { signIn } from '../middleware/auth.mdw.js'
import { Article } from '../models/articleModel.js'
const router = Router()

router.get('/hot-articles', () => {})
router.get('/newsest-articles', () => {})
router.get('/types', fetchAllTypes)

router.get('/', () => {})

// Fetch single article with corresponding role
router.get('/:articleID/role/:userRole', signIn, async (req, res) => {
    const { userRole, articleID } = req.params
    if (userRole === 'author') {
        try {
            const article = await Article.find(
                { 'author.0._id': req.user.id },
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
            console.log(e)
        }
    }

    if (userRole === 'reviewer') {
    }
})

// Fetch all article with corresponding role
router.get('/role/:userRole', signIn, async (req, res) => {
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

    if (userRole === 'reviewer') {
    }
})

export default router
