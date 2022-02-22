
import dotenv from 'dotenv'
dotenv.config()

const defaultConfig = {
  mongoUri: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  userRoles: ['admin', 'student'],
  sessionExpiration: 86400,
  port: 8080
};

export default defaultConfig;
