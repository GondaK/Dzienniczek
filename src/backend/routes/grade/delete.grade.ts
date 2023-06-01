import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateTeacher, authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/grade/delete',
    validators: [authorize, authenticateTeacher],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                const { GradeId } = req.body
                return await prisma.grade.delete({
                    where: {
                        GradeId: GradeId,
                    },
                })
                res.send('poprawniee wykonano usuniecie grade')
            },
        }),
} as TRoute
