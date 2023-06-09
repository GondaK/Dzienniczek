import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

//Put student to class
export default {
    method: 'put',
    path: '/api/student/set-class',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                // 1. Get the StudentID and ClassID from the request body
                const { StudentID, ClassID } = req.body

                // 2. Update the Student table
                return await prisma.student.update({
                    where: {
                        StudentID,
                    },
                    data: {
                        ClassID,
                    },
                })
            },
        }),
} as TRoute
