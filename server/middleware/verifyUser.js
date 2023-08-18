import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.send("You need to Login");
        const verified = jwt.verify(token, process.env.JWT);
        req.user = verified;
        next();
    } catch (err) {
        return res.send(err.message);
    }
}