const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: Boolean
    },
    date: {
        required: true,
        type: String
    },
    collection_id: {
        required: true,
        type: String
    }
})

const taskModel = mongoose.model('Task', taskSchema)

module.exports = taskModel