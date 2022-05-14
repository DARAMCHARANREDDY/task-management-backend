import express from 'express';
import { signIn, signUp, getUsers } from '../controllers/user.js'
const router = express.Router();

router.get('/', getUsers)
router.post('/login', signIn)
router.post('/register', signUp)
// Update one User

export default router