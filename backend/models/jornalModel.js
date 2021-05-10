import mongoose from 'mongoose'

const jornalSchema = mongoose.Schema({
    jornalNum: {
        type: Number,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true,
        unique: true,
    },
    article: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    }]
})

const Jornal = mongoose.model('Jornal', jornalSchema);

export { jornalSchema, Jornal }