const mongoose = require('mongoose')
const logger = require('logging').default('Database config')

const optionMongoose = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const connectDatabase = () => {
    const urlMongoData = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
    logger.info(`Connecting to ${process.env.MONGO_DB} database...`)
    mongoose.connect(urlMongoData, optionMongoose)
        .then(() => {
            logger.info("Successfully connected to the database")
        })
        .catch((err) => {
            logger.error(`Could not connect to the database. Exiting now...\n ${err}`)
            process.exit()
        })
}

module.exports = connectDatabase