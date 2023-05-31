import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

//Put student to class
export default {
    method: 'put',
    path: '/api/student/set-class',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { StudentID, ClassID } = req.body
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
