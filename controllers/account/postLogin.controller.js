const jwt = require('jsonwebtoken');

const postLogin = (req, res) => {
  const { username, password } = req.body
  const id = res.locals.id

  jwt.sign({ username }, process.env.SECRET_STRING, { expiresIn: '24h' }, (err, token) => {
    if (err) {
      console.log(err.message)
      res.sendStatus(503)
      return
    }
    res.status(200).json({
      id,
      token
    })
    return
  })
}

module.exports = postLogin