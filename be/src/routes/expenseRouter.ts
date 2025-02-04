import { Router } from 'express'
import { login, register } from '../controllers/authController'
import { initRateLimiter } from '../config/rateLimiter'
import { addExpense, deleteExpense, getExpenses, getSpendingInsights, updateExpense } from '../controllers/expenseController';

const router = Router()


router.post('/', addExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/insights', getSpendingInsights);


export { router as expenseRoute }
