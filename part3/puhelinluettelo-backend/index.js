const express = require('express');
const app = express();
const persons = require('./persons');

app.use(express.json());


app.get('/api/persons', (req, res) => {
    res.json(persons);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});