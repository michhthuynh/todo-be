const logger = require('logging').default('Get All Task of User')
const collectionModel = require("../../models/collection.model")
const taskModel = require("../../models/task.model")

module.exports = getAllTaskOfUser = async (req, res) => {
  const id = req.params.id

  if (typeof id === undefined) {
    res.sendStatus(400)
    return
  }

  const collections = await collectionModel.find({ user_id: id })

  if (collections[0] === undefined) {
    res.sendStatus(400)
    return
  }

  const listId = collections.map(collection => {
    return (collection['_id'])
  })

  const data = listId.map(async id => {
    return res = await taskModel.findById(id)
  })
  logger.info(data)
  res.sendStatus(200)
}