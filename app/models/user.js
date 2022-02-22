import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Post from './post.js';
import Constants from '../config/constants.js';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required.'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Email is required'],
    validate: {
      validator(email) {
        const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
        return emailRegex.test(email);
      },
      message: '{VALUE} is not a valid email.',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  role: {
    type: String,
    default: 'admin',
  },
}, {
  timestamps: true,
});


UserSchema
  .path('password')
  .validate(function (password) {
    return password.length >= 6 && password.match(/\d+/g);
  }, 'Password be at least 6 characters long and contain 1 number.');


UserSchema
  .pre('save', function (done) {
    this.hashPassword(this.password, (err, hash) => {
      this.password = hash;
      done();
    });
  }
  );

UserSchema.methods = {

  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },

  generateToken() {
    return jwt.sign({ _id: this._id }, Constants.sessionSecret, {
      expiresIn: Constants.sessionExpiration,
    });
  },

  hashPassword(password, callback) {
    return bcrypt.hash(password, 3, callback);
  },
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
