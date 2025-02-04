import express, { Application } from 'express'
import { config } from './config/config'
import { mainRouter } from './routes/mainRouter'
import helmet from 'helmet'
import cors from 'cors'

const app: Application = express()

app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: ['https://localhost:5173'],
        credentials: true
    })
)
app.use(express.json())

app.use('/api/v1', mainRouter)

app.listen(config.PORT, () => {
    // logger.info('sever running on port::')
})
