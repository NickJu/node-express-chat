const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);

const textSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  text: { type: String, required: true },
  time:{type: String, require: true}
});

module.exports = mongoose.model('msg', textSchema);