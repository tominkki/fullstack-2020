interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number) : Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(day => day !== 0).length;
  const average = hours.reduce((acc, cur) => acc + cur) / periodLength;
  const success = target <= average ? true : false;
  let rating;
  let ratingDescription;

  if(target - average > 1) {
    rating = 1;
    ratingDescription = 'Get your life in order.';
  }
  else if(1 >= target - average && target - average >= -1) {
    rating = 2;
    ratingDescription = 'Good job!';
  }
  else {
    rating = 3;
    ratingDescription = 'Awesome, you must be Schwarzenegger.'
  }

  return {
   periodLength,
   trainingDays,
   success,
   rating,
   ratingDescription,
   target,
   average
  }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
