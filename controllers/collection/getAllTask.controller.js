const collectionModel = require("../../models/collection.model")
const taskModel = require("../../models/task.model")
const logger = require('logging').default('Get Collection')

module.exports = getAllTask = async (req, res) => {
    const id = req.query.id
    console.log(id)
    if (typeof id === undefined) {
        res.sendStatus(400)
        return
    }
    const collections = await taskModel.find({ collection_id: id })

    if (collections[0] === undefined) {
        res.sendStatus(400)
        return
    }

    logger.info("Get Collections: Successful")
    res.status(200).json(collections)
}