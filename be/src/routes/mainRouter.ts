import { Router } from 'express'
import { userRoute } from './userRoute'
import { isAuthenticated } from '../middlewares/authMiddleware'
import { expenseRoute } from './expenseRouter'

const router = Router()

router.use('/user', userRoute)
router.use('/expenses', expenseRoute)

export { router as mainRouter }
