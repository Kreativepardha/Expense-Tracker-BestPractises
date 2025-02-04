import { NextFunction, Request, Response } from 'express'
import logger from '../utils/utils'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        logger.warn('Authentication failed: No token provided')
        return res.status(403).json({
            message: 'Access denied, token missing'
        })
    }
}
