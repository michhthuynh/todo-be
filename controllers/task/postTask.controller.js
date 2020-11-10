const taskModel = require('../../models/task.model')
const collectionModel = require('../../models/collection.model')
const logger = require('logging').default('Create Task')

module.exports = postTask = async (req, res) => {
    const { description, collection_id, date } = req.body
    let temp = ''

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

    collectionModel.findById(collection_id).then(data => {
        if( data === null ) {
            logger.error(`Message: No Collection`)
            res.sendStatus(400)
            return
        }
        taskModel.create({
            description,
            collection_id,
            date: temp
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