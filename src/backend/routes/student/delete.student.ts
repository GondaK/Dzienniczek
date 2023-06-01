import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/student/delete',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                const { StudentId } = req.body
                const student = await prisma.student.findFirst({
                    where: {
                        StudentID: StudentId,
                    },
                })
                await prisma.student.delete({
                    where: {
                        StudentID: StudentId,
                    },
                })
                await prisma.user.delete({
                    where: {
                        UserID: student?.UserID,
                    },
                })
                res.send('poprawnie wykonano usuniecie Student')
            },
        }),
} as TRoute
