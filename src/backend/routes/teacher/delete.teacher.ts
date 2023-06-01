import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

// Delete Teacher
export default {
    method: 'delete',
    path: '/api/teacher/delete',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            execute: async () => {
                const { teacherId } = req.body

                // Get Teacher
                const teacher = await prisma.teacher.findFirst({
                    where: {
                        TeacherID: teacherId,
                    },
                })

                // Delete Teacher
                await prisma.teacher.delete({
                    where: {
                        TeacherID: teacherId,
                    },
                })

                // Delete related User
                await prisma.user.delete({
                    where: {
                        UserID: teacher?.UserID,
                    },
                })
                res.send('poprawnie wykonano usuniecie Teacher')
            },
        }),
} as TRoute
