import util from 'util'
import 'winston-mongodb'
import { createLogger, format, transports } from 'winston'
import * as sourceMapSupport from 'source-map-support'
import { red, blue, yellow, green, magenta } from 'colorette'
import { config } from '../config/config'

sourceMapSupport.install()

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info

    const customLevel = colorizeLevel(level.toUpperCase())

    const customTimestamp = green(timestamp as string)

    const customMessage = message

    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`
})

const logger = createLogger({
    level: 'info',
    defaultMeta: {
        service: 'expense-tracker'
    },
    transports: [
        new transports.Console({
            format: format.combine(format.timestamp(), format.colorize(), consoleLogFormat)
        }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        new transports.MongoDB({
            db: config.DB_URL,
            collection: 'logs',
            options: { useUnifiedTopology: true },
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

export default logger
