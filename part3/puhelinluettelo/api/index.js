require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const { response } = require('express');
const person = require('./models/person');
const app = express();

morgan.token('req', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :response-time :req'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let persons = [];

app.get('/info', (req, res) => {
    
    let date = new Date();
    let count = persons.length;

    res.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`
    );
});

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.post('/api/persons', (req, res) => {

    if(!req.body.name) {
        return res.status(400).json({
            error: 'name missing'
        });
    }

    if(!req.body.number) {
        return res.status(400).json({
            error: 'number missing'
        });
    }

    if(persons.find(p => p.name === req.body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = new Person({
        name: req.body.name,
        number: req.body.number
    });

    person.save().then(p => {
        res.json(p);
    });
});

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if(!person) {return res.status(404).end();}
    
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end();
    });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});