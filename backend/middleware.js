import { JWT_SECRET } from './config.js';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(403).json({
            msg:"Authorization failed"
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        

    } catch (err){
        return res.status(403).json({
            msg: "Authorization error"
        })
    }
}