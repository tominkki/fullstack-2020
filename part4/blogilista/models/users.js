const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  pwHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
    delete retObj.pwHash;
  }
});

module.exports = mongoose.model('User', userSchema);
