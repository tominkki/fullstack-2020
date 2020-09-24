const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

morgan.token('req', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :response-time :req'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendick",
        "number": "39-23-6423122"
    }
];

app.get('/info', (req, res) => {
    
    let date = new Date();
    let count = persons.length;

    res.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${date}</p>`
    );
});

app.get('/api/persons', (req, res) => {

    res.json(persons);
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

    const person = req.body;

    person.id = persons.length > 0 
        ? Math.max(...persons.map(p => p.id)) + 1 
        : 1;

    persons = persons.concat(person);

    res.json(person);
});

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if(!person) {return res.status(404).end();}
    
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});