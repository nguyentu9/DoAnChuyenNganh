import { Router } from 'express'
import { fetchAllReviewer } from '../controller/reviewer.controller.js'
const router = Router()

router.get('/', fetchAllReviewer)
export default router
