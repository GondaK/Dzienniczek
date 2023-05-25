import { Request, Response } from 'express'
import { TRoute } from '../types'
export default {
    method: 'get',
    path: '/api/status',
    validators: [],
    handler: async (req: Request, res: Response) => {
        res.send(`I'm alive!`)
    },
} as TRoute
