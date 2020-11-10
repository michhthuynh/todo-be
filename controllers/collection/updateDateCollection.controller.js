const collectionModel = require('../../models/collection.model')
const logger = require('logging').default('Remove Collection')

module.exports = updateCollection = async (req, res) => {
  const id = req.params.id
  const { date } = req.body

  if (date === undefined || id === undefined) {
    res.sendStatus(400)
    return
  }

  collectionModel.findByIdAndUpdate(id, {date}).then(data => {
    console.log(data)
    res.sendStatus(200)
    return
  }).catch(err => {
    logger.error(`Message: ${err.message}`);
    res.sendStatus(400)
    return
  })
}