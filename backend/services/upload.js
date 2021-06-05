import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { convertViToEn } from './char.js'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: (req, file, cb) => {
        let { originalname: org } = file

        let index = org.lastIndexOf('.')
        let filename = convertViToEn(org.substring(0, index))
        let ext = org.substring(index)

        const newName = filename + '_' + Date.now() + ext
        cb(null, newName)
    },
})

var upload = multer({ storage }).array('files', 5)

export default function (req, res, next) {
    return upload(req, res, () => {
        if (req.files.length === 0) return res.json({ error: 'Lỗi! File rỗng' })
        next()
    })
}
