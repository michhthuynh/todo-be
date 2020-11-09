const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    jwt.verify(res.locals.token, process.env.SECRET_STRING, err => {
        if (err) {
            res.status(403).json({
                message: '403 Forbidden'
            })
            return
        }
        next()
    })
}

module.exports = verifyToken