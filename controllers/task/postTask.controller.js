const taskModel = require('../../models/task.model')

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

    taskModel.create({
        description,
        collection_id,
        date: temp
    }).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
}