const mongoose = require('mongoose');

if(process.argv.length < 3 || process.argv.length > 5) {
    console.log('incorrect amount of args');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.tecnd.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

let persons = [];
const addPerson = process.argv.length === 5 ? true : false;

Person.find({}).then(res => {
    persons = res;

    if(addPerson) {
        const p = new Person({
            id: Math.max(...persons.map(p => p.id)) + 1,
            name: process.argv[3],
            number: process.argv[4]
        });

        p.save().then(res => {
            console.log(res);
            mongoose.connection.close()
        })        
    }

    else {
        persons.forEach( p => {
            console.log(p);
        });
        mongoose.connection.close()
    }   
});
