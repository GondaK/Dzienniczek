import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest, TCustomError } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'
import { createToken } from '../../utils/jwt.utils'
const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'
const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

// Logging into the system, returns JWT token of logged-in user
export default {
    method: 'get',
    path: '/api/login',
    validators: [body('Email').isEmail(), body('Password').not().isEmpty()],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            responseFailStatus: StatusCodes.UNAUTHORIZED,
            execute: async () => {
                // Destructure email and password from the request body
                const { Email, Password } = req.body
                // Hash the password
                const passwordHash = createHash(Password, SALT)
                // Find the user with the given email
                const user = await prisma.user.findFirst({ where: { Email } })
                // Check if the given password matches the hashed password in the database
                const passwordValid = user
                    ? user.Password === passwordHash
                    : false
                // If the user doesn't exist or the password is invalid, throw an error
                if (!user || !passwordValid)
                    throw {
                        status: StatusCodes.UNAUTHORIZED,
                        message: ReasonPhrases.UNAUTHORIZED,
                        isCustomError: true,
                    } as TCustomError
                // If the user exists and the password is valid, create and return a JWT token
                return {
                    token: createToken(user, SECRET, '7d'),
                }
            },
        }),
} as TRoute
