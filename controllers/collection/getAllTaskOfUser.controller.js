const logger = require('logging').default('Get All Task of User')
const collectionModel = require("../../models/collection.model")
const taskModel = require("../../models/task.model")

module.exports = getAllTaskOfUser = async (req, res) => {
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

  const listCollection = collections.map(collection => {
    return ({
      id: collection['_id'],
      title: collection['title']
    })
  })

  const fetch = (title, id) => {
    return new Promise(
      (resolve, reject) => {
        taskModel.find({ collection_id: id })
          .then(data => {
            resolve({
              title: title,
              collection_id: id,
              task_list: data
            })
          })
          .catch(err => {
            reject(err.message)
          })
      }
    )
  }

  const getData = async () => {
    return Promise.all(listCollection.map(item => fetch(item['title'], item['id'])))
  }

  getData()
    .then(data => {
      res.status(200).json({
        message: data
      })
      return
    })
    .catch(err => {
      res.sendStatus(400)
    })
}