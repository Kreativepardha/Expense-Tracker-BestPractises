import mongoose from 'mongoose'
import { config } from './config'
import logger from '../utils/logger'

export const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL as string)
        logger.info('MongoDb is cponnected')
    } catch (err) {
        logger.error('Error connecting to MongoDb', err)
        process.exit(1);
    }
}
