import { Router } from 'express'
import { login, register } from '../controllers/authController'
import { initRateLimiter } from '../config/rateLimiter'

const router = Router()

router.post('/register', register)
router.use('/login', initRateLimiter, login)

export { router as userRoute }
