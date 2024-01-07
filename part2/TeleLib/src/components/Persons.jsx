const Person = ({ person, index, deleteperson}) => {
   
    return (
        <li key={index}>{person.name} - {person.number}
        <button onClick={deleteperson}>Delete</button></li>
    )
}

export default Person