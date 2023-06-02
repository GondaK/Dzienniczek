import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

// import and use authorize and authenticateAdmin validators
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
                // get teacherId from request body
                const { teacherId } = req.body
                // find teacher by teacherId
                const teacher = await prisma.teacher.findFirst({
                    where: {
                        TeacherID: teacherId,
                    },
                })
                // delete teacher by teacherId
                await prisma.teacher.delete({
                    where: {
                        TeacherID: teacherId,
                    },
                })
                // delete user by UserId
                await prisma.user.delete({
                    where: {
                        UserID: teacher?.UserID,
                    },
                })
                // send response
                res.send('poprawnie wykonano usuniecie Teacher')
            },
        }),
} as TRoute
