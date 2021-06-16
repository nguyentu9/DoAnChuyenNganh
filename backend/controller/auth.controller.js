import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import { UserDetail } from '../models/userDetailModel.js'
import md5 from 'md5'
export const signin = async (req, res) => {
    const { userName, passWord } = req.body

    if (!userName || !passWord) {
        res.json({
            status: 401,
            message: 'Tài khoản hoặc mật khẩu rỗng',
        })
        return
    }

    const user = await User.findOne(
        { userName },
        { userName: 1, passWord: 1, isAdmin: 1 }
    )

    if (!user) {
        res.json({
            status: 401,
            message: 'Tài khoản không tồn tại',
        })
        return
    }
    if (user.passWord != passWord) {
        res.json({
            status: 401,
            message: 'Tài khoản hoặc mật khẩu sai',
        })
        return
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
        res.json({
            status: 409,
            message: 'Mật khẩu không khớp',
        })
        return
    }

    let user = await User.findOne({ userName })
    if (user) {
        res.json({
            status: 409,
            message: 'Tên đăng nhập đã tồn tại',
        })
        return
    }

    user = await UserDetail.findOne({ email: emailAddr })
    if (user) {
        res.json({
            status: 409,
            message: 'Email đã tồn tại',
        })
        return
    }

    user = await UserDetail.findOne({ phone })
    if (user) {
        res.json({
            status: 409,
            message: 'Số điện thoại đã tồn tại',
        })
        return
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
