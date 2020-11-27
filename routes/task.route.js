const express = require('express')
const postTask = require('../controllers/task/postTask.controller')
const removeTask = require('../controllers/task/removeTask.controller')
const updateStatus = require('../controllers/task/updateStatus.controller')
const updateTask = require('../controllers/task/updateTask.controller')

const router = express.Router()

router.post('/create', postTask)

router.delete('/remove', removeTask)

router.put('/update/desc', updateTask)
router.put('/update/status', updateStatus)

module.exports = router