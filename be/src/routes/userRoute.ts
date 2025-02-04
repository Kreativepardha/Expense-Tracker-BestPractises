import { Router } from 'express'
import { register } from '../controllers/authController'
import { initRateLimiter, rateLimiterMongo } from '../config/rateLimiter'

const router = Router()

router.use('/register', initRateLimiter, register)
router.use('/login', login)

export { router as userRoute }
