import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

//Update data in grade
export default {
    method: 'put',
    path: '/api/grade/update',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const {
                    GradeId,
                    GradeValue,
                    GradeName,
                    SubjectID,
                    StudentID,
                } = req.body
                return await prisma.grade.update({
                    where: {
                        GradeId
                    },
                    data: {
                        GradeValue,
                        GradeName,
                        SubjectID,
                        StudentID,
                    },
                })
            },
        }),
} as TRoute
