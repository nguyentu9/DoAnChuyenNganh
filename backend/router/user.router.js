import { Router } from 'express';
import { fetchAllUsers, fetchUserByID} from '../controller/user.controller.js';

const router = Router();

router.get('/', fetchAllUsers);
router.get('/:id', fetchUserByID);


export default router;
