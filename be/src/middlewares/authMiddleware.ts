import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { checkRateLimit } from '../config/rateLimiter'






export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        logger.warn('Authentication failed: No token provided')
        return res.status(403).json({
            message: 'Access denied, token missing'
        })
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if(err) {
            logger.warn('Authentication failed: : Invalid or expired token');
            return res.status(403).json({
                message: 'Invalid or expired token'
            });
        }

        req.user = decoded;
        next();

    })
}
    

 export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;

    const isAllowed  = await checkRateLimit(ip);

    if(!isAllowed) {
        logger.warn(`Rate Limit exceedeed for IP:: ${ip}`)
         res.status(429).json({
            message: `Too many requests please try agian`
        })
        return
    }

    next();
}