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
                // Get the GradeId from the request body
                const { GradeId } = req.body
                // Delete the grade
                return await prisma.grade.delete({
                    where: {
                        GradeId: GradeId,
                    },
                })
                // Send a response
                res.send('poprawniee wykonano usuniecie grade')
            },
        }),
} as TRoute
