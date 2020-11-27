const taskModel = require('../../models/task.model')
const collectionModel = require('../../models/collection.model')
const logger = require('logging').default('Create Task')

module.exports = postTask = async (req, res) => {
    const { description, collection_id, date, status } = req.body
    let temp = ''
    let tempStatus = false

    if (description === undefined) {
        res.sendStatus(400)
        return
    }
    if (collection_id === undefined) {
        res.sendStatus(400)
        return
    }
    if (date === undefined) {
        temp = Date.now()
    } else {
        temp = date
    }

    if (status !== undefined) {
        tempStatus = status
    }

    collectionModel.findById(collection_id).then(data => {
        if (data === null) {
            logger.error(`Message: No Collection`)
            res.sendStatus(400)
            return
        }
        taskModel.create({
            description,
            collection_id,
            date: temp,
            status: tempStatus
        }).then(data => {
            logger.info(`Message: Create Task ${data.id}`)
            res.sendStatus(200)
        }).catch(err => {
            logger.error(`Message: ${err.message}`)
            res.sendStatus(400)
        })
    }).catch(err => {
        logger.error(`Message: ${err.message}`)
        res.sendStatus(400)
    })

}