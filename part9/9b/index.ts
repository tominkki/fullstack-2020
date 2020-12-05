import express from 'express';
import calculateBmi from './src/bmiCalculator';
import calculateExercises from './src/exerciseCalculator';

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

app.post('/exercises', (req, res) => {
  const daily_excercises = req.body.daily_exercises as Array<number>;// eslint-disable-line @typescript-eslint/no-unsafe-member-access
  const target = req.body.target as number;// eslint-disable-line @typescript-eslint/no-unsafe-member-access
  if(!daily_excercises || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }
  if(isNaN(target) || daily_excercises.some(isNaN)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  return res.json(calculateExercises(daily_excercises, target));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
