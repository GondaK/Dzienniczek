import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/student',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                const { studentId } = req.body
                console.log(studentId)
                const student = await prisma.student.findFirst({
                    where: {
                        StudentID: studentId,
                    },
                })
                await prisma.student.delete({
                    where: {
                        StudentID: studentId,
                    },
                })
                await prisma.user.delete({
                    where: {
                        UserID: student?.UserID,
                    },
                })
            },
        }),
} as TRoute
