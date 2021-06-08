import jwt from 'jsonwebtoken'

import { User } from '../models/userModel.js'
export const signin = async (req, res) => {
    const { userName, passWord } = req.body

    if (!userName || !passWord) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản hoặc mật khẩu rỗng',
        })
    }

    const user = await User.findOne(
        { userName },
        { userName: 1, passWord: 1, isAdmin: 1 }
    )

    if (!user) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản không tồn tại',
        })
    }
    if (user.passWord != passWord) {
        res.status(401).json({
            status: 'error',
            message: 'Tài khoản hoặc mật khẩu sai',
        })
    }

    let { _id: id, isAdmin } = user
    const token = await jwt.sign({ id, isAdmin }, process.env.JWT_KEY, {
        expiresIn: '1h',
    })

    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        token,
        isAdmin,
    })
}

export const signup = async (req, res) => {
    console.log(req.body)
    const {
        userName,
        passWord,
        fullName,
        phone,
        emailAddr,
        major,
        degree,
        organization,
        address,
    } = req.body

    // if (!userName.trim() || !passWord.trim() || !fullName.trim() || !phone.trim()
    //     || !emailAddr.trim() || !major.trim() || !degree.trim() || !office.trim() || !address.trim()) return;

    const user = await User.findOne({ userName })
    console.log(user)
    if (user) {
        res.json({ message: 'Tên đăng nhập đã tồn tại' })
    }
    res.json({
        status: 200,
        message: 'Đăng ký thành công',
    })

    // try {
    //     // await User.create({ userName, passWord })
    // } catch (err) {
    //     console.error(err);
    // }
}
