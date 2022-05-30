const jwt = require('jsonwebtoken');

const protect =  (req, res, next) => {
    try {
        const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.cookies.jwtData = data;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'your token is not valid',
            error,
        });
    };
};

module.exports = protect;