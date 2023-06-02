// Import express types
import { Request, Response } from 'express'

// Import http status codes
import { StatusCodes } from 'http-status-codes'

// Import Prisma client
import { prisma } from '../../database'

// Import types
import { TRoute } from '../types'

// Import request handler
import { handleRequest } from '../../utils/request.utils'

// Import authorization middleware
import { authorize } from '../../utils/middleware.utils'

// Export route
export default {
    // This route uses the GET method
    method: 'get',

    // The path is '/api/teacher/search-teacher'
    path: '/api/teacher/search-teacher',

    // This route is only accessible by authorized users
    validators: [authorize],

    // This is the handler function
    handler: async (req: Request, res: Response) =>
        handleRequest({
            // Pass the request and response
            req,
            res,

            // This is the status code for a successful request
            responseSuccessStatus: StatusCodes.OK,

            // This is the execution function
            execute: async () => {
                // Get the name from the request body
                const { Name } = req.body

                // Find all teachers that contain the name
                return await prisma.teacher.findMany({
                    include: {
                        User: true,
                    },
                    where: {
                        User: {
                            Name: {
                                contains: Name,
                            },
                        },
                    },
                })
            },
        }),
} as TRoute
