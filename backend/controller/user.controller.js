import { User } from '../models/userModel.js'

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200)
            .json(users);
    } catch (err) {
        console.error(err);
    }
}

export const fetchUserByID = async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id });
        res.json(user);
    } catch (err) {
        console.error(err);
    }
}