const express = require('express');
const app = express();
const persons = require('./persons');

app.use(express.json());


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

app.get('/api/persons/:id', (req, res) => {

    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    person ? res.json(person) : res.status(404).end();
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});