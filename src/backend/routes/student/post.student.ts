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

//Creates User and Student entity
export default {
    method: 'post',
    path: '/api/student',
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
                // destructure the variables from the request body
                const { Email, Name, Password } = req.body
                // hash the password
                const passwordHash = createHash(Password, SALT)
                // create the user record
                const user = await prisma.user.create({
                    data: {
                        UserID: v4(),
                        Name,
                        Email,
                        Password: passwordHash,
                    },
                })
                // create the student record
                return await prisma.student.create({
                    data: {
                        StudentID: v4(),
                        UserID: user.UserID,
                    },
                })
            },
        }),
} as TRoute
