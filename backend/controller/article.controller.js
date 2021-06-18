import { Type } from '../models/typeModel.js'

export const fetchAllTypes = async (req, res) => {
    try {
        const types = await Type.find()
        res.json(types)
    } catch (err) {
        console.error(err)
    }
}
