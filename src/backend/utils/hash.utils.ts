import crypto from 'crypto'
export const createHash = (data: string, salt: string) => {
    const hash = crypto.createHmac('sha512', salt)
    hash.update(data)
    return hash.digest('hex')
}
export const checkHash = (
    data: string,
    hash: string,
    salt: string,
): boolean => {
    return createHash(data, salt) === hash
}
