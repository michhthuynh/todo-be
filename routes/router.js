const express = require('express')
const collectionRouter = require('./collection.route')
const userRouter = require('./user.route')
const taskRouter = require('./task.route')
const getToken = require('../middleware/getToken.middleware')
const verifyToken = require('../middleware/verifyToken.middleware')
const router = express.Router()

router.use('/auth', userRouter)
router.use('/collection', getToken, verifyToken, collectionRouter)
router.use('/task', getToken, verifyToken, taskRouter)


module.exports = router