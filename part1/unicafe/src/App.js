import { useState } from 'react'

const StaticLine = ({name, num}) => (<td>{name}: {num}</td>)

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const Statistic = ({good, bad, neutral}) => {
  const total = good + bad + neutral
  if (total < 1){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <StaticLine name="Good" num={good} />
          </tr>
          <tr>
            <StaticLine name="Neutral" num={neutral} />
          </tr>
          <tr>
            <StaticLine name="Bad" num={bad} />
          </tr>
          <tr>
            <StaticLine name="All" num={total} />
          </tr>
          <tr>
            <StaticLine name="Average" num={(good - bad) / total} />
          </tr>
          <tr>
            <StaticLine name="Postive" num={(good / total) * 100 + "%"} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const countBad = () => setBad(bad + 1)
  const countGood = () => setGood(good + 1)
  const countNeutral = () => setNeutral(neutral + 1)
  return (
    <div>
      <div>
        <Button text="Good" handleClick={countGood} />
        <Button text="Neutral" handleClick={countNeutral} />
        <Button text="Bad" handleClick={countBad} />
      </div>
      <Statistic good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App