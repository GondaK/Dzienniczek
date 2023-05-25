import { RequestHandler, Request, Response } from 'express'
export type TRoute = {
    method: 'get' | 'post' | 'put' | 'patch' | 'delete'
    path: string
    validators: RequestHandler[]
    handler: (req: Request, res: Response) => Promise<void>
}
