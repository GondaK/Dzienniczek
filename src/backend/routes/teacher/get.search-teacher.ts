import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'get',
    path: '/api/teacher/search-teacher',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const { Name } = req.body
                return await prisma.teacher.findMany({
                    include: {
                        User: true,
                    },
                    where: {
                        User: {
                            Name: {
                                contains: Name,
                            },
                        },
                    },
                })
            },
        }),
} as TRoute
