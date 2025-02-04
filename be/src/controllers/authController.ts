import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '../validations/authValidator'
import { loginService, logoutService, registerService } from '../services/authService'
import logger from '../utils/logger'




export const register = async (req: Request, res: Response) => {
    try {
    const validatedData = registerSchema.parse(req.body)

    const response = await registerService(validatedData)
    res.status(201).json(response)
} catch (er: any) {
    logger.error(er.message)
        res.status(400).json({
            message: er.message || 'regitsration failed'
        })
}
}


export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = loginSchema.parse(req.body)
        const res = await loginService(validatedData)
        res.cookie('refreshToken', res.refreshToken, {
            httpOnly: true,
            secure: //,
        });
        res.json(res)
    } catch (er) {
        res.status(400).json({
            message: er.message
        })
    }
}


export const logout = async (req: Request, res: Response) => {
    try {
        await logoutService(req.cookies.refreshToken)
        res.clearCookie('refreshToken')
        res.json({
            message: "Logged out succesfully"
        })
    } catch (er) {
        res.status(500).json({ message: "Server error" });
    }
}