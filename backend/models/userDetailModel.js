import mongoose from 'mongoose'
// import { degreeSchema } from './degreeSchema'
// import { majorSchema } from './majorSchema'

const userDetailSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        fullName: String,
        address: String,
        degree: Object,
        major: Object,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true,
        },
        // organization
        org: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        _id: false,
    }
)

const UserDetail = mongoose.model('UserDetail', userDetailSchema)

export { userDetailSchema, UserDetail }
