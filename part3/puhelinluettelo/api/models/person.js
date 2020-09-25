const mongoose = require('mongoose');

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
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);