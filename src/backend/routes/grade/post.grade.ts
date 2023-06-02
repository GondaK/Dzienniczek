import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize, authenticateTeacher } from '../../utils/middleware.utils'

//Creates grade
export default {
    method: 'post',
    path: '/api/grade',
    validators: [authorize, authenticateTeacher],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                // 1. Destructure the req.body object to get its properties
                const { GradeValue, GradeName, SubjectID, StudentID } = req.body
                // 2. Return the result of the prisma.grade.create method
                return await prisma.grade.create({
                    // 3. Pass the data object with the properties that the method expects
                    data: {
                        GradeId: v4(),
                        GradeValue,
                        GradeName,
                        SubjectID,
                        StudentID,
                    },
                })
            },
        }),
} as TRoute
