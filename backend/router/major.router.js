import { Router } from 'express';
import { fetchAllMajors} from '../controller/major.controller.js';
const router = Router();
 
router.get('/', fetchAllMajors);

export default router;