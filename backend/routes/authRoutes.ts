import express from 'express';
import { getUser, logIn, signUp } from '../controllers/authController';

const router = express.Router();

router.get('/getUser', getUser);
router.post('/logIn', logIn);
router.post('/signUp', signUp);


export default router;
