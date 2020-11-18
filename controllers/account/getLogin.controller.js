const userModel = require("../../models/user.model")

const getLogin = (req, res) => {
  const username = res.locals.username
  userModel.find({ username: username }).then(data => {
    const id = data[0].id
    res.status(200).json({
      username,
      id: id
    })
  })
}

module.exports = getLogin