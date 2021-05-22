import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js'



import { User } from './models/userModel.js'
import { Major } from './models/majorModel.js';
import { Degree } from './models/degreeModel.js';

import jwt from 'jsonwebtoken'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.json({
        message: 'API is running'
    })
})

app.post('/api/v1/auth/signin', async (req, res) => {
    const { userName, passWord } = req.body;

    if (!userName || !passWord) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản hoặc mật khẩu rỗng'
        })
    }


    const user = await User.findOne({ userName }, { userName: 1, passWord: 1, isAdmin: 1 });

    if (!user) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản không tồn tại'
        })
    }
    if (user.passWord != passWord) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản hoặc mật khẩu sai'
        })
    }

    let { _id: id, isAdmin } = user;
    const token = await jwt.sign(
        { id, isAdmin },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        token
    });

})

app.post('api/v1/auth/signup', async (req, res) => {
    const { userName, passWord, fullName, phone, emailAddr, major, degree, office, address } = req.body;
    if (!userName.trim() || !passWord.trim() || !fullName.trim() || !phone.trim()
        || !emailAddr.trim() || !major.trim() || !degree.trim() || !office.trim() || !address.trim()) return;

    const user = await User.findOne({ userName });
    console.log(user);
    if (user.trim()) {
        res.json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    try {
        await User.create({ userName, passWord })
    } catch (err) {
        console.error(err);
    }
})


app.get('/api/v1/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200)
            .json(users);
    } catch (err) {
        console.error(err);
    }
});

app.get('/api/v1/users/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id });
        res.json(user);
    } catch (err) {
        console.error(err);
    }
});

app.get('/api/v1/majors', async (req, res) => {
    try {
        const majors = await Major.find();
        res.json(majors);
    } catch (err) {
        console.error(err);

    }
})

app.get('/api/v1/degrees', async (req, res) => {
    try {
        const degrees = await Degree.find();
        res.json(degrees);
    } catch (err) {
        console.error(err);
    }
})

app.get('/api/v1/hotArticles', (req, res) => {

})

app.get('/api/v1/newsestArticles', (req, res) => {

})




app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);