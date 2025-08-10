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
try {
  app.listen(config.port, '0.0.0.0', (err) => {
    if (err) {
      console.error('Server error:', err)
      process.exit(1)
    }
    console.info(`Server running at http://localhost:${config.port}`)
  }).on('error', (err) => {
    console.error('Server failed to start:', err)
    process.exit(1)
  })
} catch (error) {
  console.error('Failed to create server:', error)
  process.exit(1)
}