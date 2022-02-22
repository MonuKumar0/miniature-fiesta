import mongoose from 'mongoose';
import Constants from './app/config/constants.js';
import User from './app/models/user.js';

mongoose.connect(Constants.mongoUri);
mongoose.connection.on('error', (err) => {
    throw err;
});

async function populate() {
    await User.create([
        {
            username: "admin1",
            email: "admin1@gmail.com",
            password: "admin1",
            role: "admin"
        },
        {
            username: "student1",
            email: "student1@gmail.com",
            password: "student1",
            role: "student"
        }
    ]);
    process.exit(0);
}

populate()


export default null