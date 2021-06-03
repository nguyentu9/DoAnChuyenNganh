import { Major } from '../models/majorModel.js';


export const fetchAllMajors = async (req, res) => {
    try {
        const majors = await Major.find();
        res.json(majors);
    } catch (err) {
        console.error(err);

    }
}