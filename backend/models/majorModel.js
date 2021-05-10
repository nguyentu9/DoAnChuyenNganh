import mongoose from 'mongoose'

const majorSchema = mongoose.Schema({
    majorName: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true
})

const Major = mongoose.model('Major', majorSchema);

export { majorSchema, Major };