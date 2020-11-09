const collectionModel = require("../../models/collection.model")
const logger = require('logging').default('Get Collection')

module.exports = getCollection = async (req, res) => {
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

    logger.info("Get Collections: Successful")
    res.status(200).json(collections)
}