import mongoose from 'mongoose'
import { degreeSchema } from './degreeSchema'
import { majorSchema } from './majorSchema'

const userDetailSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        fullName: String,
        address: String,
        degree: degreeSchema,
        major: majorSchema,
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
        oganization: String,
    },
    {
        timestamps: true,
        _id: false,
    }
)

const UserDetail = mongoose.model('UserDetail', userDetailSchema)

export { userDetailSchema, UserDetail }
