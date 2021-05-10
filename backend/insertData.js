import dotenv from 'dotenv'
import connectDB from './config/db.js'

import users from '../data/user.js'
import { User } from '../models/userModel.js'

dotenv.config();
connectDB();


const importData = async () => {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    console.log('ID admin: ', adminUser);
}

const deleteData = async () => {

}


if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
