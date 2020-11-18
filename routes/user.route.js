const express = require('express')
const getLogin = require('../controllers/account/getLogin.controller')
const userRouter = express.Router()

const postLogin = require('../controllers/account/postLogin.controller')
const postSignUp = require('../controllers/account/postSignUp.controller')
const getToken = require('../middleware/getToken.middleware')
const verifyLogin = require('../middleware/verifyLogin.middleware')
const verifyToken = require('../middleware/verifyToken.middleware')


userRouter.post('/signup', postSignUp)

userRouter.post('/login', verifyLogin, postLogin)
userRouter.get('/login', getToken, verifyToken, getLogin)

module.exports = userRouter