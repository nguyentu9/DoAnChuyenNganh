import { Router } from 'express';
import { fetchAllDegrees } from '../controller/degree.controller.js';
const router = Router();


router.get('/', fetchAllDegrees);


export default router;