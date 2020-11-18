const bcrypt = require('bcrypt')
const validator = require("validator")
const userModel = require("../models/user.model");

const verifyLogin = async (req, res, next) => {
    const { username, password } = req.body
    console.log(username)
    if (username == undefined || password == undefined) {
        res.status(400).json({
            message: "Username or Password is invalid"
        })
        return
    }

    if (!validator.isLength(username, { min: 6, max: 26 })) {
        res.status(400).json({
            message: "Username is invalid"
        })
        return
    }

    if (!validator.isLength(password, { min: 6, max: 26 })) {
        res.status(400).json({
            message: "Password is invalid"
        })
        return
    }

    const result = await userModel.find({ username: username });
    if (!result[0]) {
        res.status(401).json({
            message: 'User does not exist'
        });
        return;
    }

    const match = await bcrypt.compare(password, result[0]['password'])

    if (!match) {
        res.status(401).json({
            message: 'Wrong password.'
        })
        return;
    }
    res.locals.id = result[0]['id']
    console.log('Verify account successfully')
    next()
}

module.exports = verifyLogin