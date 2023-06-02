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
                // Get the ClassID from the request body
                const { ClassID } = req.body
                // Retrieve the Class and all of its Students from the database
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
