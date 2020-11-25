const express = require('express')
const getAllTask = require('../controllers/collection/getAllTask.controller')
const getCollection = require('../controllers/collection/getCollection.controller')
const updateTitleCollection = require('../controllers/collection/updateTitleCollection.controller')
const removeCollection = require('../controllers/collection/removeCollection.controller')
const postCollection = require('../controllers/collection/postCollection.controller')
const updateDateCollection = require('../controllers/collection/updateDateCollection.controller')
const getAllTaskOfUserController = require('../controllers/collection/getAllTaskOfUser.controller')
const collectionRouter = express.Router()

collectionRouter.post('/create', postCollection)

collectionRouter.delete('/remove', removeCollection)

collectionRouter.put('/:id/title/', updateTitleCollection)
collectionRouter.put('/:id/date/', updateDateCollection)

collectionRouter.get('/get-task', getAllTask)
collectionRouter.get('/:id', getCollection)
collectionRouter.get('/:id/task', getAllTaskOfUserController)

module.exports = collectionRouter