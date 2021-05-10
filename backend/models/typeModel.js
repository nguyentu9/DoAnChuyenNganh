import mongoose from 'mongoose'

const typeSchema = mongoose.Schema({
    typeName: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

const Type = mongoose.model('Type', typeSchema);

export { typeSchema, Type };

