import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/subject/delete',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                // Get the SubjectID from the request body
                const { SubjectID } = req.body
                // Find the Subject in the database and delete it
                return await prisma.subject.delete({
                    where: {
                        SubjectID: SubjectID,
                    },
                })
                res.send('poprawniee wykonano usuniecie subject')
            },
        }),
} as TRoute
