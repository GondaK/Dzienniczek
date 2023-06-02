import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'

export default {
    method: 'get',
    path: '/api/student',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                // Destructure the StudentID from the request body
                const { StudentID } = req.body
                // Use Prisma to find the student with the StudentID
                return await prisma.student.findUnique({
                    // Include the student's grades in the response
                    include: {
                        Grades: true,
                    },
                    // Find the student with the StudentID
                    where: {
                        StudentID: StudentID,
                    },
                })
            },
        }),
} as TRoute
