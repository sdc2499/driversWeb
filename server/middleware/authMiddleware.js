import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'no token' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'incorrect token' });
        }
        req.userId = decoded.userId;
        next();
    });
};
