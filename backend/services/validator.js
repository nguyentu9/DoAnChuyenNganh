import { body } from 'express-validator'

export const uploadArticleSchema = [
    body('title').notEmpty().withMessage('Tiêu đề không được rỗng'),
    body('brief').notEmpty().withMessage('Tóm tắt không được rỗng'),
    body('keyWord').notEmpty().withMessage('Từ khoá không được rỗng'),
    body('type')
        .isArray({ min: 1, max: 10 })
        .withMessage('Loại không được rỗng'),
    body('author')
        .isArray({ min: 1, max: 10 })
        .withMessage('Tác giả không được rỗng'),
    body('fileNames')
        .isArray({ min: 1, max: 5 })
        .withMessage('Tên file không được rỗng'),
]
