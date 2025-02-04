import { Connection } from 'mongoose'
import { RateLimiterMongo } from 'rate-limiter-flexible'

export let rateLimiterMongo: null | RateLimiterMongo = null

const DURATION = 60
const POINTS = 10
const BLOCK_DURATION = 60

export const initRateLimiter = (mongooseConnection: Connection) => {
    if (rateLimiterMongo) {
        // loggers.warn("Rate LIMITER ALREADY INITIALIZED")
        return
    }

    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        points: POINTS,
        duration: DURATION,
        blockDuration: BLOCK_DURATION
    })
    // logger.info("Rate limiter initialized")

    const checkRateLimit = async (ip: string): Promise<boolean> => {
        if (!rateLimiterMongo) {
            throw new Error('Rate limit not initialized. Call initRatelimiter first.')
        }

        try {
            await rateLimiterMongo.consume(ip)
            return true
        } catch (er) {
            // logger.warn('rate limiter exceeedded')
            return false
        }
    }
}
