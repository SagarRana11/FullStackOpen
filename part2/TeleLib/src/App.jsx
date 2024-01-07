import { useState ,useEffect} from 'react'
import axios from 'axios'
import settings from './services/notes'
import Person from'./components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    // Fetch initial data from the server
    settings
      .getAll()
      .then(initialPerson =>{
        setPersons(initialPerson)
      })
      
      
  }, []); 
  const [newName, setNewName] = useState('new namee...')
  const [newNumber, setNewNumber] = useState('123456789')
  const[successMessage, setSuccessMessage] = useState(null)
  const[errorMessage,setErrorMessage] =useState(null)


  const Notification=({message})=>{

    if(message === null){
      return null
    }
    return(
      <div className='success'>
          {message}
      </div>
    )
  }
  const ErrNotification=({message})=>{

    if(message === null){
      return null
    }
    return(
      <div className='error'>
          {message}
      </div>
    )
  }


  
  const handleInput = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
    console.log(event.target.value)

  }

  const handleInput2 =(event)=>{
    event.preventDefault()
    setNewNumber(event.target.value)
    console.log(event.target.value)

  }

  const handleBtnClick=(event)=>{
    event.preventDefault()
    console.log("button was clicked", event.target)

    const nameExists = persons.some(person => person.name ===newName);
   


    if(nameExists){
      alert(`${newName} is already in the phonebook`)
      const userConfirmed = window.confirm('Are you sure you want to proceed?');

      if (userConfirmed) {
        // Code to execute if the user clicked "OK"
        console.log('User confirmed. Proceeding...');
        const person = persons.find(m=>m.name ===newName)
      const id = person.id;
      const updatedPerson = {...person, number: newNumber}
     

      settings
        .update( id,updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person=> person.id !==id ? person:returnedPerson))

        })
        .then(returnedPerson =>{
          setSuccessMessage(`Person " ${newName} " number has been changed`)
          console.log(successMessage)
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)
        })
        

        setNewName('')
         setNewNumber('')
      } else {
        // Code to execute if the user clicked "Cancel" or closed the dialog
        console.log('User canceled. Action aborted.');
}

      
    }else{
      const newPerson ={name : newName , number: newNumber};
      

      settings
          .create(newPerson)
          .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))
          })
          .then(returnedPerson=>{
            setSuccessMessage(`Added ${newName}`)
          })
          setTimeout(()=>{
            setSuccessMessage(null)
          },5000)

      setPersons(persons.concat(newPerson))
      
      setNewName('')
      setNewNumber('')
    }

    

   

  }

  const deleteperson=(index)=>{

   
    const id =index;
    const person = persons.find(m=>m.id===id)
    const name = person.name
   

    const userConfirmed = window.confirm('are you sure?');

    if (userConfirmed) {
      // Code to execute if the user clicked "OK"
      console.log('User confirmed. Proceeding...');
      console.log("the contact that is to be deleted :",person)

      settings
        .deleteperson(id, person)
        .then(returnedPerson=>{
          setSuccessMessage(`Person ${name} contact has been deleted`)
          setTimeout(()=>{
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error=>{
          setErrorMessage(`Information of ${name} has already been removed from the server `)
          .setTimeout(()=>{
            setErrorMessage(null)
          },5000)
        })

      setPersons(persons.filter(n=>n.id !==id))
    } else {
      // Code to execute if the user clicked "Cancel" or closed the dialog
      console.log('User canceled. Action aborted.');
    }

    

   
    
    
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <ErrNotification message={errorMessage} />
       
      <div>
            name: <input value={newName} onChange={handleInput} />

        </div>
      <form onSubmit={handleBtnClick}>
       
        <div>number: <input value={newNumber} onChange={handleInput2} /></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      
      <ul>
      {persons.map((person,index)=>
        <Person person={person} key={index} deleteperson={()=>deleteperson(person.id)} />)}
     </ul>

      
    </div>
  )
}
export default App
