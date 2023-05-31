import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

//Update data in class
export default {
    method: 'put',
    path: '/api/class/update',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { ClassID, ClassName, TeacherID } = req.body
                return await prisma.class.update({
                    where: {
                        ClassID,
                    },
                    data: {
                        ClassName,
                        TeacherID,
                    },
                })
            },
        }),
} as TRoute
