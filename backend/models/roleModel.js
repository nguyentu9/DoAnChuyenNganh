import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});


const Role = mongoose.model('Role', roleSchema);

export { roleSchema, Role };