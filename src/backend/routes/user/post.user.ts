import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'
const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'
export default {
    method: 'post',
    path: '/api/user',
    validators: [
        authorize,
        authenticateAdmin,
        body('Email').isEmail(),
        body('Password').not().isEmpty(),
    ],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            messages: { uniqueConstraintFailed: 'Email must be unique.' },
            execute: async () => {
                // Destructure the request body to get the values passed in from the client
                const { Email, Name, Password } = req.body
                // Hash the password
                const passwordHash = createHash(Password, SALT)
                // Create the user
                return await prisma.user.create({
                    data: {
                        UserID: v4(),
                        Name,
                        Email,
                        Password: passwordHash,
                    },
                })
            },
        }),
} as TRoute
