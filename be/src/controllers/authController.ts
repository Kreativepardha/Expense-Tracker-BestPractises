import { Request, Response } from 'express'
import { registerSchema } from '../validations/authValidator'
import { registerService } from '../services/authService'

export const register = async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body)
    const response = await registerService(validatedData)
    res.status(201).json(response)
}
