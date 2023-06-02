import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateTeacher, authorize } from '../../utils/middleware.utils'

//Update data in grade
export default {
    method: 'put',
    path: '/api/grade/update',
    validators: [authorize, authenticateTeacher],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                // 1. Destructure the variables from the request body
                const { GradeId, GradeValue, GradeName, SubjectID, StudentID } =
                    req.body
                // 2. Call the Prisma Client function to update a grade
                return await prisma.grade.update({
                    // 3. Set the where clause to the GradeId
                    where: {
                        GradeId,
                    },
                    // 4. Set the new values for the grade
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
