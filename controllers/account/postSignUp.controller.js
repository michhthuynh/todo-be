const userModel = require('../../models/user.model')
const validator = require('validator')
const EmailValidator = require('email-validator')
const bcrypt = require('bcrypt')

const postSignUp = async (req, res) => {
    const { username, password, email } = req.body
    const fullName = req.body.full_name

    // validate fields
    if (!validator.isLength(username, { min: 10, max: 26 })) {
        res.status(400).json({
            message: "Username is invalid"
        })
        return
    }

    if (!validator.isLength(fullName, { min: 10, max: 26 })) {
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

    if (!validator.isLength(password, { min: 10, max: 26 })) {
        res.status(400).json({
            message: "Password is invalid"
        })
        return
    }

    if (!validator.isLength(email, { min: 10, max: undefined })) {
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
                    res.status(201).json({
                        message: 'Sign up successfully'
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