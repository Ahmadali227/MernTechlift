const mongoose = require('mongoose');

//schemma

const userSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: [true, 'Name is required'],

  },
  email: {
    type: 'String',
    required: [true, 'Email is required and should be a unique email address'],
    unique: true
  },
  password: {
    type: 'String',
    required: [true, 'Password is required'],

  },

}, { timestamps: true })
const useModel = mongoose.model('users', userSchema);
module.exports = useModel;