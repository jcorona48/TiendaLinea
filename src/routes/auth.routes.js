import {Router} from 'express'
import {signup} from '../controllers/auth.controllers'

const router = Router()

router.post('/signup', signup);
router.post('/signin');


export default router;