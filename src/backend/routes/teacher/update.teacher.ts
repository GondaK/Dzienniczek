import { Request, Response } from 'express'
import { body } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../../database'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { authorize } from '../../utils/middleware.utils'
import { createHash } from '../../utils/hash.utils'
const SALT = (process.env.PASSWORD_SALT as string) ?? 'XYZ'

//Update teacher
export default {
    method: 'put',
    path: '/api/teacher/update',
    validators: [authorize],
    handler: async (req: Request, res: Response) =>
        handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.CREATED,
            execute: async () => {
                const { TeacherID, Name, Email, Password } = req.body
                const passwordHash = createHash(Password, SALT)
                const teacher = await prisma.teacher.findFirst({
                    where: {
                        TeacherID: TeacherID,
                    },
                })
                return await prisma.user.update({
                    where: {
                        UserID: teacher?.UserID,
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
