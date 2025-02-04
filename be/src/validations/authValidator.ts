import { z } from 'zod'

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('INvalud email format'),
    password: z.string().min(6, 'Password is atleast 6 chars')
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be atleast 6 chars')
})
