import mongoose from 'mongoose'

const articleSchema = mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
        },
        brief: String,
        keyWord: [String],
        type: [
            // {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Type',
            // },
        ],
        articleDownloads: {
            type: Number,
            default: 0,
        },
        articleViews: {
            type: Number,
            default: 0,
        },
        receivedDate: {
            type: Date,
            default: Date.now(),
        },
        publishedDate: {
            type: Date,
            default: Date.now(),
        },
        author: [
            // {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'UserDetail',
            // },
        ],
        attachments: [],
        imageURL: {
            type: String,
            default:''
        },
        status: [String],
    },
    {
        timestamps: true,
    }
)

const Article = mongoose.model('Article', articleSchema)

export { articleSchema, Article }
