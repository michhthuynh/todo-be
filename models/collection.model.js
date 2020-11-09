const mongoose = require('mongoose')

const collectionSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    user_id: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },

})

const collectionModel = mongoose.model('Collection', collectionSchema)

module.exports = collectionModel