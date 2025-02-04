import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { checkRateLimit } from '../config/rateLimiter'
import { AuthenticatedUser } from '../types/authTypes'

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
   
    if (!token || typeof token !== 'string') {
        logger.warn('Authentication failed: Invalid token format');
        return res.status(403).json({ message: 'Invalid token format' });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unnecessary-type-assertion
      const jwtSecret = config.JWT_SECRET as string
      
      if (!jwtSecret) {
        logger.error('JWT Secret is missing in config');
        return res.status(500).json({ message: 'Internal server error' });
      }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    jwt.verify(token, jwtSecret,(err, decoded) => {
        if (err) {
            logger.warn('Authentication failed: : Invalid or expired token')
             res.status(403).json({
                message: 'Invalid or expired token'
            })
        }

        ///
        req.user = decoded as AuthenticatedUser
        next()
    })
}

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
        return res.status(400).json({ message: 'Could not determine IP address' });
      }
  
    const isAllowed = await checkRateLimit(ip)

    if (!isAllowed) {
        logger.warn(`Rate Limit exceedeed for IP:: ${ip}`)
        res.status(429).json({
            message: `Too many requests please try agian`
        })
        return
    }

    next()
}
