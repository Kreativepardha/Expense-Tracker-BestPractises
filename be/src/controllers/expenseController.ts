import { Request, Response } from 'express'
import { expenseSchema } from '../validations/expenseValidator'
import { addExpenseService, deleteExpenseService, getExpensesService, getSpendingInsightsService, updateExpenseService } from '../services/addExpenseService'
import logger from '../utils/logger'

export const addExpense = async (req: Request, res: Response) => {
    try {
        const validatedData = expenseSchema.parse(req.body)
        const response = await addExpenseService(req.user!.userId, validatedData)
        logger.info(`Expense added for user ${req.user?.userId}`)
        res.status(201).json(response)
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Error adding expense ${error.message}`)
        res.status(400).json({
            message: error.message
        })
    }
}

export const getExpenses = async (req: Request, res: Response) => {
    try {
        // const { page = 1, limit = 10, category, startDate, endDate } = req.query

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const category = req.query.category as string | undefined;
        const startDate = req.query.startDate as string | undefined;
        const endDate = req.query.endDate as string | undefined;

        const response = await getExpensesService(req.user!.userId, { page, limit, category, startDate, endDate })
        logger.info(`Fetched expenses for user: ${req.user!.userId}`)
        res.json(response)
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Error fetching expenses: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const validatedData = expenseSchema.parse(req.body)
        const response = await updateExpenseService(req.user!.userId, req.params.id, validatedData)
        logger.info(`Expense updated for user: ${req.user!.userId}, expense: ${req.params.id}`)
        res.json(response)
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Error updating expense: ${error.message}`)
        res.status(400).json({ message: error.message })
    }
}

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const response = await deleteExpenseService(req.user!.userId, req.params.id)
        logger.info(`Expense deleted for user: ${req.user!.userId}, expense: ${req.params.id}`)
        res.json(response)
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Error deleting expense: ${error.message}`)
        res.status(400).json({ message: error.message })
    }
}

export const getSpendingInsights = async (req: Request, res: Response) => {
    try {
        const response = await getSpendingInsightsService(req.user!.userId)
        logger.info(`Spending insights generated for user: ${req.user!.userId}`)
        res.json(response)
    } catch (err: unknown) {
        const error = err as Error;
        logger.error(`Error generating spending insights: ${error.message}`)
        res.status(500).json({ message: error.message })
    }
}
