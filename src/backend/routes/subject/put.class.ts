import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

//Update data in subject
export default {
    method: 'put',
    path: '/api/subject/update',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { SubjectID, SubjectName, TeacherID } = req.body
                return await prisma.subject.update({
                    where: {
                        SubjectID,
                    },
                    data: {
                        SubjectName,
                        TeacherID,
                    },
                })
            },
        }),
} as TRoute
