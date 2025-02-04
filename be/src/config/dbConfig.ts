import mongoose from 'mongoose'
import { config } from './config'
import logger from '../utils/logger'

export const connectDB = async () => {
    try {
        const dburl = config.DB_URL
        if (!dburl) {
            throw new Error('DB_URL is not defined in the environment variables')
        }

        await mongoose
            .connect(dburl)
            .then(() => logger.info('connected to db'))
            .catch((err) => logger.info(err))
        logger.info('MongoDb is cponnected')
    } catch (err) {
        logger.error('Error connecting to MongoDb', err)
        process.exit(1)
    }
}
