import { z } from 'zod'

export const expenseSchema = z.object({
    amount: z.number().positive('Amount must be a positive number'),
    category: z.string().min(1, 'Category is required'),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid Date format'
    }),
    description: z.string().optional()
})
