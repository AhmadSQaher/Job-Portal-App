const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "linx_super_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://millikifleyesus:X5LMUWO7sFIYpbsV@test.fxrqpco.mongodb.net/linx?retryWrites=true&w=majority",
};

export default config;
