import mongoose from 'mongoose'
import {degreeSchema} from './degreeSchema'
import {majorSchema} from './majorSchema'

const userDetailSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    degreeID: degreeSchema,
    majorID: majorSchema,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const UserDetail = mongoose.model('UserDetail', userDetailSchema);

export { userDetailSchema, UserDetail};