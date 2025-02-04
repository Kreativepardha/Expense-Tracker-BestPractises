import mongoose from 'mongoose'
import { config } from './config'

const connectDB = async () => {
    try {
        await mongoose.connect(config.DB_URL as string)
        // logger.info('mooa)
    } catch (err) {
        // logger.error
    }
}
