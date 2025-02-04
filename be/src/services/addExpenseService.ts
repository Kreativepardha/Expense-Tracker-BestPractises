/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Expense } from '../models/ExpenseSchema'
import logger from '../utils/logger'

export const addExpenseService = async (userId: string, data: any) => {
    const expense = new Expense({ userId, ...data })
    await expense.save()
    logger.info(`Expense added: ${expense._id} by user: ${userId}`)
    return { message: 'Expense added successfully', expense }
}

export const getExpensesService = async (userId: string, filters: any) => {
    const { page, limit, category, startDate, endDate } = filters
    const query: any = { userId }

    if (category) query.category = category
    if (startDate || endDate) query.date = { $gte: startDate || 0, $lte: endDate || Date.now() }

    const expenses = await Expense.find(query)
        .sort({ date: -1 }) // Sort by latest expense
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))

    logger.info(`Fetched expenses for user: ${userId} with filters`)
    return { expenses, page, limit }
}

export const updateExpenseService = async (userId: string, expenseId: string, data: any) => {
    const expense = await Expense.findOneAndUpdate({ _id: expenseId, userId }, data, { new: true })
    if (!expense) throw new Error('Expense not found')

    logger.info(`Expense updated: ${expenseId} by user: ${userId}`)
    return { message: 'Expense updated', expense }
}

export const deleteExpenseService = async (userId: string, expenseId: string) => {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, userId })
    if (!expense) throw new Error('Expense not found')

    logger.info(`Expense deleted: ${expenseId} by user: ${userId}`)
    return { message: 'Expense deleted' }
}

export const getSpendingInsightsService = async (userId: string) => {
    const insights = await Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: '$category', total: { $sum: '$amount' } } },
        { $sort: { total: -1 } }
    ])

    const totalSpending = insights.reduce((sum, cat) => sum + cat.total, 0)
    const insightsWithPercentage = insights.map((category) => ({
        ...category,
        percentage: ((category.total / totalSpending) * 100).toFixed(2) + '%'
    }))

    logger.info(`Spending insights generated for user: ${userId}`)
    return { insights: insightsWithPercentage, totalSpending }
}
