import express from 'express'
import { getUser, logIn, signUp } from '../controllers/authController'
import { AUTH_ROUTES } from '../utils/backendConsts'

const router = express.Router()

router.get(AUTH_ROUTES.GET_USER, getUser)
router.post(AUTH_ROUTES.LOGIN, logIn)
router.post(AUTH_ROUTES.SIGNUP, signUp)

export default router
