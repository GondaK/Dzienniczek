import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

// Allows to query teacher by his name
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

                // Join User entity and compare name
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
