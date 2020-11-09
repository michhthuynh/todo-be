const mongoose = require('mongoose')

const optionMongoose = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const connectDatabase = () => {
    const urlMongoData = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
    console.log(urlMongoData)
    console.log(`Connecting to ${process.env.MONGO_DB} database...`)
    mongoose.connect(urlMongoData, optionMongoose)
        .then(() => {
            console.log("Successfully connected to the database")
        })
        .catch((err) => {
            console.log(`Could not connect to the database. Exiting now...\n ${err}`)
            process.exit()
        })
}

module.exports = connectDatabase