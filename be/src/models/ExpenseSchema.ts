import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        amount: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String
        }
    },
    { timestamps: true }
)

export const Expense = mongoose.model('Expense', expenseSchema)
