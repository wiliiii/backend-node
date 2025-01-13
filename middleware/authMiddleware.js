const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = { verifyToken };
