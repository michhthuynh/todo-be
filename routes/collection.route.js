const express = require('express')
const getAllTask = require('../controllers/collection/getAllTask.controller')
const getCollection = require('../controllers/collection/getCollection.controller')
const postCollection = require('../controllers/collection/postCollection.controller')
const collectionRouter = express.Router()

collectionRouter.post('/create', postCollection)
collectionRouter.get('/get-task', getAllTask)
collectionRouter.get('/:id', getCollection)

module.exports = collectionRouter