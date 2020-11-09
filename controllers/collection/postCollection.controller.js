const collectionModel = require("../../models/collection.model")
const logger = require('logging').default('Post Collection')

module.exports = postCollection = (req, res) => {
    const { title, user_id } = req.body
    if (title === undefined) {
        res.sendStatus(400)
        return
    }

    if (user_id === undefined) {
        res.sendStatus(400)
        return
    }

    collectionModel.create({
        title,
        user_id,
        date: Date.now()
    }).then(() => {
        logger.info(`Create Collection: Successful`)
        res.sendStatus(200)
    }).catch(err => {
        logger.error(`Message: ${err}`)
        res.sendStatus(400)
    })
}