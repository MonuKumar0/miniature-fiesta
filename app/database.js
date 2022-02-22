import mongoose from 'mongoose';
import Constants from './config/constants.js';

mongoose.connect(Constants.mongoUri);
mongoose.connection.on('error', (err) => {
  throw err;
});

export default null
