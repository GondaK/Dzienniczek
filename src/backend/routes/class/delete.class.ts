import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/class/delete',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                // 1. Get the ClassID from the request body
                const { ClassID } = req.body
                // 2. Use Prisma Client to delete the Class
                return await prisma.class.delete({
                    where: {
                        ClassID: ClassID,
                    },
                })
                // 3. Send the response
                res.send('poprawnie wykonano usuniecie Class')
            },
        }),
} as TRoute
