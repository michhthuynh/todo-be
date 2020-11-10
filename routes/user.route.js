const express = require('express')
const userRouter = express.Router()

const postLogin = require('../controllers/account/postLogin.controller')
const postSignUp = require('../controllers/account/postSignUp.controller')
const verifyLogin = require('../middleware/verifyLogin.middleware')


userRouter.post('/signup', postSignUp)

userRouter.post('/login', verifyLogin, postLogin)

module.exports = userRouter