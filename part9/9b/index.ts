import express from 'express';
import calculateBmi from './src/bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!height || !weight) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  return res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
