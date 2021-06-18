import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import { UserDetail } from '../models/userDetailModel.js'
import md5 from 'md5'
export const signin = async (req, res) => {
    const { userName, passWord } = req.body

    if (!userName || !passWord) {
        return res.json({
            status: 401,
            message: 'Tài khoản hoặc mật khẩu rỗng',
        })
    }

    const user = await User.findOne(
        { userName },
        { userName: 1, passWord: 1, isAdmin: 1 }
    )

    if (!user) {
        return res.json({
            status: 401,
            message: 'Tài khoản không tồn tại',
        })
    }
    if (user.passWord != passWord) {
        return res.json({
            status: 401,
            message: 'Tài khoản hoặc mật khẩu sai',
        })
    }

    const { _id, isAdmin } = user

    let userDetail = await UserDetail.findOne({ _id })
    const token = await jwt.sign({ id: _id, isAdmin }, process.env.JWT_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE || '1h',
    })

    res.status(200).json({
        status: 'success',
        message: 'Đăng nhập thành công',
        token,
        isAdmin,
        fullName: userDetail?.fullName || '',
        _id,
    })
}

export const signup = async (req, res) => {
    const {
        userName,
        passWord,
        fullName,
        phone,
        confirmPassword,
        emailAddr,
        major,
        degree,
        organization,
        address,
    } = req.body

    if (passWord !== confirmPassword) {
        return res.json({
            status: 409,
            message: 'Mật khẩu không khớp',
        })
    }

    let user = await User.findOne({ userName })
    if (user) {
        return res.json({
            status: 409,
            message: 'Tên đăng nhập đã tồn tại',
        })
    }

    user = await UserDetail.findOne({ email: emailAddr })
    if (user) {
        return res.json({
            status: 409,
            message: 'Email đã tồn tại',
        })
    }

    user = await UserDetail.findOne({ phone })
    if (user) {
        return res.json({
            status: 409,
            message: 'Số điện thoại đã tồn tại',
        })
    }
    try {
        const newUser = new User({ userName, passWord: md5(passWord) })
        const { _id } = await newUser.save()
        const userDetail = new UserDetail({
            _id,
            fullName,
            address,
            degree,
            org: organization,
            major,
            email: emailAddr,
            phone,
        })

        await userDetail.save()
    } catch (e) {
        console.error(e)
    }

    res.status(201).json({ status: 201, message: 'Đăng ký thành công' })
}
