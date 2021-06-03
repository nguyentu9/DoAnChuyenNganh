import { Degree } from '../models/degreeModel.js';

export const fetchAllDegrees = async (req, res) => {
    try {
        const degrees = await Degree.find();
        res.json(degrees);
    } catch (err) {
        console.error(err);
    }
}