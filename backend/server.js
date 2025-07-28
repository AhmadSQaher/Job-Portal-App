import 'dotenv/config'
import config from './config/config.js'
import app from './server/express.js'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
    console.log(`Database URI: ${config.mongoUri}`)
  })
  .catch((error) => {
    console.error(`Unable to connect to database: ${config.mongoUri}`)
    console.error(`Error details: ${error.message}`)
    console.error('Please ensure MongoDB is running or check your connection string')
    // Don't throw an error immediately, let the server start anyway
  })

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message)
})

// Optional welcome route (you could remove this if duplicated in express.js)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the LINX Job Portal API' })
})

// Launch the server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err)
  }
  console.info(`Server running at http://localhost:${config.port}`)
})