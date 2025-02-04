import { Request, Response } from 'express'
import { loginSchema, registerSchema } from '../validations/authValidator'
import { loginService, logoutService, registerService } from '../services/authService'
import logger from '../utils/logger'




export const register = async (req: Request, res: Response) => {
    try {
    const validatedData = registerSchema.parse(req.body)

    const response = await registerService(validatedData)

    res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: false, // remember CHANGE to TRUE in Prod 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(201).json({
        message: response.message,
        accessToken: response.accesstoken
    })
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
        const response = await loginService(validatedData)
     
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        res.cookie('refreshToken', response.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        res.status(200).json({ accessToken: response.accessToken })
    } catch (er: any) {
        logger.error(er.message);
        res.status(400).json({ message: er.message || 'Login failed' });

    }
}


export const logout = async (req: Request, res: Response) => {
    try {
        await logoutService()

      res.clearCookie('refreshToken', { httpOnly: true, secure: false });

        res.json({ message: 'Logged out successfully' });
    } catch (er: any) {
        logger.error(er.message);
        res.status(500).json({ message: 'Server error' });
    }
}