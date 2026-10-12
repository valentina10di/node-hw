import jwt from 'jsonwebtoken';
import 'dotenv/config';
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    console.log(authHeader);


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Невалидный JWT'
        })
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: 'Невалидный JWT',
                reason: err.name,
            })
        }

        req.user = decoded;

        next();
    })

}

export default authenticateJWT;