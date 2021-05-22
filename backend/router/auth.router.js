import bcrypt from 'bcrypt'

import { Router } from 'express'
const router = Router();

export const signin = async(req, res, next) => {
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

}


