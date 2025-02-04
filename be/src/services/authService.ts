import { config } from '../config/config'
import User from '../models/userModel'
import { RegisterData } from '../types/authTypes'
import { CustomError } from '../utils/errorHandler'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = (userId: string) => {
    const accessToken = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: '1h'})
    return accessToken;
}


export const registerService = async (Data: RegisterData) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { firstName, lastName, email, password } = Data
    const existingUser = await User.findOne({ email })

    if (existingUser) throw new CustomError('User Already exists', 400)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPass = bcrypt.hashSync(password, 10)
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = new User({ firstName, lastName, email, password: hashedPass })
    await user.save()

    const token = generateToken(user._id)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { message: 'User registered successfully', ...token }
}

export const loginService = async({ email, password}: any) => {
    const existingUser = await User.findOne({ email })
    if(!existingUser) throw new CustomError('Invalid Credentials', 400)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const isMatch = bcrypt.compareSync(password, existingUser.password)
        if(!isMatch) throw new CustomError('invalid credentials', 400)

            return generateToken(existingUser._id)
}

export const logoutService = async (token: string) => {
    return {
        message: 'User LOgged Out'
    }
}