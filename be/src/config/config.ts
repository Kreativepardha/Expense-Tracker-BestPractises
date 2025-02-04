import dotenv from 'dotenv'

dotenv.config()

export const config = {
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    DB_URL: process.env.DB_URL || '',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default'
}
