import { Request, Response, NextFunction } from 'express'
import { verifyToken } from './jwt.utils'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../database'

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)
    if (!token || !result.isValid) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    next()
}

export const authenticateAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)

    if (!result.content.IsAdmin) {
        res.sendStatus(StatusCodes.FORBIDDEN)
        return
    }

    next()
}

export const authenticateTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)
    const teacher = await prisma.teacher.findFirst({
        where: {
            UserID: result.content.UserID,
        },
    })

    if (null === teacher) {
        res.sendStatus(StatusCodes.FORBIDDEN)
        return
    }

    next()
}

export const authenticateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)
    const student = await prisma.student.findFirst({
        where: {
            UserID: result.content.UserID,
        },
    })

    if (null === student) {
        res.sendStatus(StatusCodes.FORBIDDEN)
        return
    }

    next()
}
