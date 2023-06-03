import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TRoute } from '../types'
import { handleRequest } from '../../utils/request.utils'
import { calculateAverageGrade } from '../../utils/average.utils'
import {
    authenticateStudent,
    authorize,
    getUser,
} from '../../utils/middleware.utils'
import { prisma } from '../../database'

// Returns
export default {
    method: 'get',
    path: '/api/average',
    validators: [authorize, authenticateStudent],
    handler: async (req: Request, res: Response) => {
        return handleRequest({
            req,
            res,
            responseSuccessStatus: StatusCodes.OK,
            execute: async () => {
                // Get the subject ID from the request body
                const { SubjectID } = req.body

                // Get the current user from the request
                const user = await getUser(req)

                // If there is no user, return a 403 (forbidden) response
                if (null === user) {
                    res.sendStatus(StatusCodes.FORBIDDEN)

                    return
                }

                const grades = await prisma.grade.findMany({
                    include: {
                        Student: true,
                    },
                    where: {
                        SubjectID,
                        Student: {
                            UserID: user.UserID,
                        },
                    },
                })

                return calculateAverageGrade(user, SubjectID, grades)
            },
        })
    },
} as TRoute
