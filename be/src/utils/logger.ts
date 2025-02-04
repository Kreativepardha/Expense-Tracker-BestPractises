import util from 'util'
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
    return `${customLevel} [${customTimestamp}] ${customMessage}\n`
})

const logger = createLogger({
    level: 'info',
    defaultMeta: {
        service: 'expense-tracker'
    },
    transports: [
        new transports.Console({
            format: format.combine(format.timestamp(), format.colorize(), consoleLogFormat)
        })
    ]
})

export default logger
