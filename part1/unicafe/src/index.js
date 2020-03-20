import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
)

const StatisticLine = ({text, value, mark}) =>(
     <tr>
         <td>{text}:</td>
         <td>{value} {mark}</td>
    </tr>
)

    
    

const Statistics = ({good, neutral, bad}) =>{
    const sum = good + neutral + bad;
    const average = (good * 1 + bad * -1) / sum;
    const positivePercentage = (good / sum ) * 100;

    if(sum === 0){
        return(
            <div>
                <h1>Statistics</h1>
                <p>No feedback given.</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Statistics</h1>
            <table><tbody>
            <StatisticLine text = 'Positive' value = {good} />
            <StatisticLine text = 'Neutral' value = {neutral} />
            <StatisticLine text = 'Negative' value = {bad} />
            <StatisticLine text = 'Average' value = {average} />
            <StatisticLine text = 'Positive' value = {positivePercentage} mark = '%' />
            </tbody></table>
        </div>
    );
}
const App = () => {

    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return(
        <div>
            <h1>Give feedback</h1>
            <Button onClick = {() => setGood(good + 1)} text = 'Positive'/>
            <Button onClick = {() => setNeutral(neutral + 1) } text = 'Neutral'/>
            <Button onClick = {() => setBad(bad + 1)} text = 'Negative'/>
            <Statistics good = {good} neutral = {neutral} bad = {bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
