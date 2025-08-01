import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(() => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`)
  })

mongoose.connection.on('error', () => {
  console.error('MongoDB connection error')
})

// Launch the server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err)
  }
  console.info(`Server running at http://localhost:${config.port}`)
})