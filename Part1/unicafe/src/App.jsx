import { useState } from 'react'



const Statistic =(props)=>{
  if(props.total ==0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  
  const average = (props.good*1 + props.bad*(-1) )/props.total
  return(
    <div>
       <p>Statistic</p>

       <p>good : {props.good}</p>
       <p>bad : {props.bad}</p>
       <p>neutral: {props.neutral}</p>
       <p>average: {average}</p>
       <p>positive: {(props.good/(props.good + props.bad))*100} %</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] = useState(0)

  const handleGoodButton=()=>{
    setGood(good+1)
    setTotal(total+1)

  }
  const handleBadButton =() =>{
    setBad(bad+1)
    setTotal(total+1)

  }
  const handleNeutralButton=()=>{
    setNeutral(neutral+1)
    setTotal(total+1)

  }

  return (
    <div>
      <p>Give Feedback</p>
      <button onClick={handleGoodButton}>Good</button>
      <button onClick={handleBadButton}>Bad</button>
      <button onClick={handleNeutralButton}>Neutral</button>

      <Statistic good ={good} bad ={bad} neutral ={neutral} total ={total} />


    </div>
  )
}

export default App