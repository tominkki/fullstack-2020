const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.DB_URL;

console.log('connecting to db');

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(res => {
    console.log('connected');
  })
  .catch(err => {
    console.log(err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    unique: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);