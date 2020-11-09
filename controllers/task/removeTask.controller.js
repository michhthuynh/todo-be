const taskModel = require('../../models/task.model')
const logger = require('logging').default('Remove Task')

module.exports = removeTask = async (req, res) => {
    const { id } = req.body
    if (id === undefined) {
        res.sendStatus(400)
        return
    }

    taskModel.findByIdAndDelete(id).then(() => {
        res.sendStatus(200)
        return

    }).catch(err => {
        logger.error(`Message: ${err.message}`);
        res.sendStatus(400)
        return
    })
}