const taskModel = require("../../models/task.model")

module.exports = updateStatus = async (req, res) => {
  const { id, status } = req.body

  if (id === undefined) {
    res.sendStatus(400)
    return
  }

  if (typeof status !== "boolean") {
    res.sendStatus(400)
    return
  }

  taskModel.findByIdAndUpdate(id, { status })
    .then(() => {
      res.sendStatus(200)
      return

    }).catch(err => {
      logger.error(`Message: ${err.message}`);
      res.sendStatus(400)
      return
    })
}