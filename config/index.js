if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  EMAIL_TO_RECIPIENT: process.env.EMAIL_TO_RECIPIENT,
  DOMAINS_WHITE_LIST: process.env.DOMAINS_WHITE_LIST,
  ENABLE_FEATURE_SEND_EMAIL: process.env.ENABLE_FEATURE_SEND_EMAIL
}