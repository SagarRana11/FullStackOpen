import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


const App = () => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ]
     
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));


    const min = 1;
    const max = anecdotes.length;
    const randomInteger = Math.floor(Math.random() * (max - min) + min);

    const selectOne =()=>{
        setSelected(randomInteger)
    }
    const handleVoteClick = () => {
        const updatedVotes = [...votes];
        const currentIndex = anecdotes.indexOf(anecdotes[selected]);
        updatedVotes[currentIndex] += 1;
        setVotes(updatedVotes);
        console.log("current index is:",currentIndex)
        console.log(votes)
        console.log(votes[currentIndex])
    };

    const getMaxVotesAnecdote = () => {
        const maxVotes = Math.max(...votes);
        const maxVotesIndex = votes.indexOf(maxVotes);
        return anecdotes[maxVotesIndex];
      };
    
   


    return (
        <div>
          {anecdotes[selected]}
          <br></br>
          <button onClick={handleVoteClick}>vote</button>
          <button onClick={selectOne}>Next Anecdote</button>

          <p>The Anecdote with most votes</p>
          <p>{getMaxVotesAnecdote()}</p>

          
        </div>
      )
    }
    

    
export default App;
