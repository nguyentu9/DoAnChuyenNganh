import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export { userSchema, User };

