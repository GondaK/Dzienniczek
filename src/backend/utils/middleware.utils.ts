import { Request, Response, NextFunction } from 'express'
import { verifyToken } from './jwt.utils'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '../database'

const SECRET = (process.env.TOKEN_SECRET as string) ?? 'XYZ'

// Check if token contains a valid user token
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)
    if (!token || !result.isValid) {
        res.sendStatus(StatusCodes.UNAUTHORIZED)
    }
    next()
}

// Check if token contains a valid Admin token
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

// Check if token contains a valid Teacher token
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

// Check if token contains a valid Student token
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
