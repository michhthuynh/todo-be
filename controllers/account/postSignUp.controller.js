const userModel = require('../../models/user.model')
const validator = require('validator')
const EmailValidator = require('email-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const postSignUp = async (req, res) => {
    const { username, password, email } = req.body
    const fullName = req.body.fullName

    if (username === undefined || password === undefined || email === undefined || fullName === undefined) {
        res.sendStatus(400)
        return
    }

    // validate fields
    if (!validator.isLength(username, { min: 6, max: 16 })) {
        res.status(400).json({
            message: "Username is invalid"
        })
        return
    }

    if (!validator.isLength(fullName, { min: 6, max: undefined })) {
        res.status(400).json({
            message: "Full name is invalid"
        })
        return
    }

    const maskFullName = fullName.replace(' ', '')
    if (!validator.isAlpha(maskFullName)) {
        res.status(400).json({
            message: "Full name is invalid"
        })
        return
    }

    if (!validator.isLength(password, { min: 6, max: 16 })) {
        res.status(400).json({
            message: "Password is invalid"
        })
        return
    }

    if (!validator.isLength(email, { min: 6, max: undefined })) {
        res.status(400).json({
            message: "Email is invalid"
        })
        return
    }

    if (!EmailValidator.validate(email)) {
        res.status(400).json({
            message: "Email is invalid"
        })
        return
    }


    // query database
    let temp = await userModel.find({ email: email })
    if (temp.length) {
        res.status(409).json({
            message: "Email already exists"
        })
        return
    }
    temp = await userModel.find({ username: username })
    if (temp.length) {
        res.status(409).json({
            message: "Username already exists"
        })
        return
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(password, salt, async (error, passwordHash) => {
            if (error) throw error


            userModel.create({
                username,
                password: passwordHash,
                email,
                full_name: fullName,
            })
                .then(data => {
                    console.log(`Create account successfully: ${data['username']}`)
                    jwt.sign({ username }, process.env.SECRET_STRING, { expiresIn: '24h' }, (err, token) => {
                        if (err) {
                            console.log(err.message)
                            res.sendStatus(503)
                            return
                        }
                        res.json({
                            id: data.id,
                            token
                        })
                        return
                    })
                    return
                })
                .catch(err => {
                    console.log(`Create account failed: ${err}`)
                    res.status(400).json({
                        message: 'Create account failed'
                    })
                })
        })
    })

}

module.exports = postSignUp