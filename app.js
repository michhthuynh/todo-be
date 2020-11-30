const express = require('express')
const createLogging = require('logging')
const app = express()
const port = process.env.PORT | 5000
const rootRouter = require('./routes/router')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDatabase = require('./configs/db.config')
const helmet = require('helmet');
const logger = createLogging.default('App')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')

const isProduction = process.env.NODE_ENV === "production"

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: path.join(__dirname, "log")
})

dotenv.config()
app.use(helmet());
app.use(isProduction ? morgan('combine', { stream: accessLogStream }) : morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
connectDatabase()

app.use('/api', rootRouter)
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is running..."
    })
})
app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    logger.info(`Server is running at ${port}`);
})