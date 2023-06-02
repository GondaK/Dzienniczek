import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'

export default {
    method: 'delete',
    path: '/api/student/delete',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.NO_CONTENT,
            // remove student from the database
            execute: async () => {
                // get the student ID from the request body
                const { StudentId } = req.body
                // find the student in the database
                const student = await prisma.student.findFirst({
                    where: {
                        StudentID: StudentId,
                    },
                })
                // delete the student from the database
                await prisma.student.delete({
                    where: {
                        StudentID: StudentId,
                    },
                })
                // delete the user associated with the student from the database
                await prisma.user.delete({
                    where: {
                        UserID: student?.UserID,
                    },
                })
                // send a success message
                res.send('poprawnie wykonano usuniecie Student')
            },
        }),
} as TRoute
