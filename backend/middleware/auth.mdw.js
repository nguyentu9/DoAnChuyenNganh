import jwt from 'jsonwebtoken'

export const signIn = async (req, res, next) => {
    let token = req.headers['authorization']
    if (token == null) {
        return res.json({
            status: 401,
            message: 'Đăng nhập để tiếp tục',
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.json({
                status: 401,
                message: 'Token không hợp lệ',
            })
        }
        req.user = user
        next()
    })
}

export const isAdmin = async (req, res, next) => {
    if (req.user.isAdmin) next()
    else {
        return res.json({
            status: 403,
            message: 'Không đủ quyền truy cập',
        })
    }
}
