import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'
dotenv.config()
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import { validationResult } from 'express-validator'

import { Article } from './models/articleModel.js'

import uploadFile from './services/upload.js'
import { uploadArticleSchema } from './services/validator.js'

import authRoute from './router/auth.router.js'
import userRoute from './router/user.router.js'
import majorRoute from './router/major.router.js'
import degreeRoute from './router/degree.router.js'
import authorRoute from './router/author.router.js'
import articleRoute from './router/article.route.js'
import { signIn, isAdmin } from './middleware/auth.mdw.js'
import articleStatus from './services/articleStatus.js'
const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
connectDB()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => res.send('API is running'))

app.use('/api/v1/authors', authorRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/degrees', degreeRoute)
app.use('/api/v1/majors', majorRoute)
app.use('/api/v1/users', signIn, isAdmin, userRoute)
app.use('/api/v1/articles', articleRoute)

app.post(
    '/api/v1/articles',
    uploadFile,
    uploadArticleSchema,
    async (req, res) => {
        try {
            const { title, brief, keyWord, type, author, fileNames } = req.body

            const errors = validationResult(req)
            // console.log(errors)

            // Remove empty words and split into array
            let key = keyWord.split(',').reduce((arr, k) => {
                var newK = k.trim()
                return newK === '' ? arr : [...arr, newK]
            }, [])

            let attachments = []
            let fnames = JSON.parse(fileNames)
            for (let i = 0; i < fnames.length; i++) {
                attachments.push({
                    fileName: fnames[i],
                    filePath: path.join('upload', req.files[i].filename),
                })
            }
            const article = await Article({
                title,
                brief,
                keyWord: key,
                type: JSON.parse(type),
                author: JSON.parse(author),
                attachments,
                status: [articleStatus.pending()],
            })
            article.save()
            res.json({
                status: 200,
                message: 'Tập tin được tải lên thành công',
                // fileNameInServer: '',
            })
        } catch (err) {
            res.json({
                status: 500,
                message: 'Lỗi',
            })
        }
    }
)

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)
