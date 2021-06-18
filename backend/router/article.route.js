import { Router } from 'express'
import { fetchAllTypes } from '../controller/article.controller.js'
import { signIn } from '../middleware/auth.mdw.js'
const router = Router()

router.get('/hot-articles', () => {})
router.get('/newsest-articles', () => {})
router.get('/types', fetchAllTypes)

router.get('/', () => {})

// Fetch single article with corresponding role
router.get('/:articleID/role/:userRole', signIn, (req, res) => {
    const { userRole, articleID } = req.params
    if (userRole === 'author') {
    } else if (userRole === 'reviewer') {
    }
})

// Fetch all article with corresponding role
router.get('/role/:userRole', signIn, (req, res) => {
    const { userRole } = req.params
    if (userRole === 'author') {
    } else if (userRole === 'reviewer') {
    }
})

export default router
