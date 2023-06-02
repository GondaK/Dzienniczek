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

//Creates class
export default {
    method: 'post',
    path: '/api/class',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                // Extract the data from the request body
                const { ClassName, TeacherID } = req.body
                // Create a new class in the database
                return await prisma.class.create({
                    data: {
                        ClassID: v4(),
                        ClassName,
                        TeacherID,
                    },
                })
            },
        }),
} as TRoute
