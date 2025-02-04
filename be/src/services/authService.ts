import { config } from '../config/config'
import User from '../models/userModel'
import { LoginData, RegisterData } from '../types/authTypes'
import { CustomError } from '../utils/errorHandler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1h' })
}

const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

export const registerService = async (data: RegisterData) => {
    const { firstName, lastName, email, password } = data

    const existingUser = await User.findOne({ email })

    if (existingUser) throw new CustomError('User Already exists', 400)

    const hashedPass = bcrypt.hashSync(password, 10)

    const user = new User({ firstName, lastName, email, password: hashedPass })
    await user.save()

    const accessToken = generateToken(user._id.toString())
    const refreshToken = generateRefreshToken(user._id.toString())

    return { message: 'User registered successfully', accessToken, refreshToken }
}

export const loginService = async (data: LoginData) => {
    const { email, password } = data
    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new CustomError('Invalid Credentials', 400)

    const isMatch = bcrypt.compareSync(password, existingUser.password)
    if (!isMatch) throw new CustomError('invalid credentials', 400)

    const accessToken = generateToken(existingUser._id.toString())
    const refreshToken = generateRefreshToken(existingUser._id.toString())

    return { accessToken, refreshToken }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const logoutService = async () => {
    return {
        message: 'User LOgged Out'
    }
}
