import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authToken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        res.status(401).json({ message: 'Access token required' });
        return;
    }

    const jwtSecret = process.env.JWT_SECRET || "default secret";
    if (!jwtSecret) {
        res.status(500).json({ message: 'JWT_SECRET not configured' });
        return;
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
            return;
        }
        req.user = user;
        next();
    });
};

export {
    authenticateToken
}