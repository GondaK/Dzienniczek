import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'get',
    path: '/api/class/get-class',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                const { ClassID } = req.body
                return await prisma.class.findUnique({
                    include: {
                        Students: true,
                    },
                    where: {
                        ClassID: ClassID,
                    },
                })
            },
        }),
} as TRoute
