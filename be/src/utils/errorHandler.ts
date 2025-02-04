import { Request, Response, NextFunction } from 'express'

class CustomError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({ message })
}

export { CustomError, errorHandler }
