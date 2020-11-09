const jwt = require('jsonwebtoken');

const postLogin = (req, res) => {
    const { username, password } = req.body

    jwt.sign({ username }, process.env.SECRET_STRING, { expiresIn: '24h' }, (err, token) => {
        if (err) {
            console.log(err.message)
            res.sendStatus(503)
            return
        }
        res.json({
            token
        })
        return
    })
}

module.exports = postLogin