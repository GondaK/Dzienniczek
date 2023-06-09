import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize, authenticateAdmin } from '../../utils/middleware.utils'

//Creates subject
export default {
    method: 'post',
    path: '/api/subject',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { SubjectName, TeacherID } = req.body
                // Create new subject in database.
                return await prisma.subject.create({
                    data: {
                        SubjectID: v4(),
                        SubjectName,
                        TeacherID,
                    },
                })
            },
        }),
} as TRoute
