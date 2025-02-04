import { config } from '../config/config'
import User from '../models/userModel'
import { CustomError } from '../utils/errorHandler'
import jwt from 'jsonwebtoken'

export const registerService = async (Data: any) => {
    const { firstName, lastName, email, password } = Data
    const existingUser = await User.findOne({ email })

    if (existingUser) throw new CustomError('User Already exists', 400)

    const user = new User({ firstName, lastName, email, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET as string, {
        expiresIn: config.JWT_EXPIRATION
    })

    return { message: 'User registered successfully', token }
}
