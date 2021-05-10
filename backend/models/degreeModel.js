import mongoose from 'mongoose'

const degreeSchema = mongoose.Schema({
    degreeName: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
})

const Degree = mongoose.model('Degree', degreeSchema);

export { degreeSchema, Degree }

