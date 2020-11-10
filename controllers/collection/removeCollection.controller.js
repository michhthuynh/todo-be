const collectionModel = require('../../models/collection.model')
const taskModel = require("../../models/task.model")
const logger = require('logging').default('Remove Collection')

module.exports = removeCollection = async (req, res) => {
  const { id } = req.body
  if (id === undefined) {
    res.sendStatus(400)
    return
  }

  collectionModel.findByIdAndDelete(id).then(data => {
    if (data === null) {
      logger.error(`Message: No Collection`);
      res.sendStatus(400)
      return
    }
    logger.info(`Message: Delete Collection ${id}`);
    taskModel.deleteMany({ collection_id: id }).then(data => {
      if (data === null) {
        logger.error(`Message: No Collection`);
        res.sendStatus(400)
        return
      }
      res.sendStatus(200)
      return
    }).catch(err => {
      logger.error(`Message: ${err.message}`);
      res.sendStatus(400)
      return
    })

  }).catch(err => {
    logger.error(`Message: ${err.message}`);
    res.sendStatus(400)
    return
  })
  
}