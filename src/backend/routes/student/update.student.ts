import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authenticateAdmin, authorize } from '../../utils/middleware.utils'
import { createHash } from '../../utils/hash.utils'
const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'

// Update Studnet
export default {
    method: 'put',
    path: '/api/student/update',
    validators: [authorize, authenticateAdmin],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                // 1. Destructure the input
                const { StudentID, Name, Email, Password } = req.body
                // 2. Hash the password
                const passwordHash = createHash(Password, SALT)
                // 3. Find the student
                const student = await prisma.student.findFirst({
                    where: {
                        StudentID: StudentID,
                    },
                })
                // 4. Update the user
                return await prisma.user.update({
                    where: {
                        UserID: student?.UserID,
                    },
                    data: {
                        Name,
                        Email,
                        Password: passwordHash,
                    },
                })
            },
        }),
} as TRoute
