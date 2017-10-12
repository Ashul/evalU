module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'b4c7f5f133daf24434b78458e3d671c1',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'SHU7iT3l4cLJsi2PWV4bg52C',
};