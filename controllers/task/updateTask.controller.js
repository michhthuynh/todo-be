const taskModel = require('../../models/task.model')
const logger = require('logging').default('Update Task')

module.exports = updateTask = async (req, res) => {
    const { id, description } = req.body
    if (id === undefined) {
        res.sendStatus(400)
        return
    }

    if (description === undefined) {
        res.sendStatus(400)
        return
    }

    taskModel.findByIdAndUpdate(id, {
        description: description
    }).then(() => {
        res.sendStatus(200)
        return

    }).catch(err => {
        logger.error(`Message: ${err.message}`);
        res.sendStatus(400)
        return
    })
}