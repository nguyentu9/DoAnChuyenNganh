import { UserDetail } from '../models/userDetailModel.js'
export const getAllAuthors = async (req, res, next) => {
    try {
        const author = await UserDetail.find(
            {},
            { fullName: 1, org: 1, email: 1 }
        )
        res.json(author)
    } catch (e) {
        console.error(e)
    }
}
