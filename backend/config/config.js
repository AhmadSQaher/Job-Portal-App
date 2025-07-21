const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'linx_super_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb+srv://sadkandel00:2wUAxypQNvLYXEoj@cluster0.t6picbu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' || // updated to specify DB
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/linx'
}

export default config
