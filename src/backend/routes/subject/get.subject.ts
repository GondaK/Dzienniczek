import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'get',
    path: '/api/subject/get-subject',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                // Get the SubjectID from the request body
                const { SubjectID } = req.body
                // Find the Subject in the database
                return await prisma.subject.findUnique({
                    where: {
                        SubjectID: SubjectID,
                    },
                })
            },
        }),
} as TRoute
