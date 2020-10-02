require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const { response } = require('express');
const person = require('./models/person');
const app = express();

morgan.token('req', (req, res) => JSON.stringify(req.body));

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(morgan(':method :url :response-time :req'));

app.get('/info', (req, res) => {
    
    let date = new Date();
    
    Person.find({}).then(persons => {
        res.send(
        `<p>Phonebook has info for ${persons.length} people.</p>
        <p>${date}</p>`
        );
    })
    .catch(err => next(err));
});

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
    const person = new Person({
        name: req.body.name,
        number: req.body.number
    });

    person.save().then(p => {
        res.json(p);
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updated => {
            res.json(updated);
        })
        .catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
    
    Person.findById(req.params.id)
    .then(p => {
        if(p){res.json(p);}
        else {res.status(404).end();}
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    person.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end();
    })
    .catch(err => next(err));
});


const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' });
    }
    else if(err.name === 'ValidationError') {
        return res.status(400).json({error: err.message});
    }
    next(err);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});