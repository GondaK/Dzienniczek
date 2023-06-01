import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { v4 } from 'uuid'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { createHash } from '../../utils/hash.utils'
import { authorize, authenticateTeacher } from '../../utils/middleware.utils'
const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'

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
                const {
                    GradeValue,
                    GradeName,
                    SubjectId,
                    TeacherID,
                    StudentID,
                } = req.body
                return await prisma.grade.create({
                    data: {
                        GradeId: v4(),
                        GradeValue,
                        GradeName,
                        SubjectId,
                        TeacherID,
                        StudentID,
                    },
                })
            },
        }),
} as TRoute
