/**
 * Jongil Yoon
 */

import { verify } from 'jsonwebtoken'
import { secret } from './secret'


// To check jwt token (high-order function)
export const authenticated = fn => async (req, res) => {
    // cookie handling is temporary
    verify(req.headers.cookies, secret, async (err, decoded) => {
        if (!err && decoded) {
            return await fn(req, res)
        }

        res.status(401).json({ message: 'you are not authenticated' })
    })
}