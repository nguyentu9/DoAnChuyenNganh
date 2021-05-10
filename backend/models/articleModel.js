import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    brief: {
        type: String,
        required: true,
    },
    keyWord: [{
        type: String,
        default: []
    }],
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }],
    articleDownloads: {
        type: Number,
        default: 0
    },
    articleViews: {
        type: Number,
        default: 0
    },
    receivedDate: {
        type: Date,
        default: Date.now()
    },
    publishedDate: {
        type: Date,
        default: Date.now()
    },
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetail'
    }],
    attachments: [{
        type: String
    }],
    imageURL: String,
    status: String
}, {
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema);


export default { articleSchema, Article };