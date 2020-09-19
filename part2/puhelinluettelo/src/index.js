import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddPerson from './components/add-person';
import FilterPeople from './components/filter-people';
import Numbers from './components/numbers';


const App = () =>{
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1231244'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data);
    })
  })

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
  } 
  
  const peopleToShow = filter === '' ? 
  persons : persons.filter(person => {
    if(person.name.toLowerCase().includes(filter.toLowerCase())){
      return person
    }
  })
    

  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => (person.name.toLowerCase()))
    const numbers = persons.map(person => (person.number))

    if(names.includes(newName.toLowerCase())){
      window.alert(`${newName} is already added to phonebook!`)
      setNewName('')
    }

    else if(numbers.includes(newNumber)){
      window.alert(`${newNumber} is already added to phonebook!`)
      setNewNumber('')
    }

    else if(newName !== '' && newNumber !== ''){
        const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  return(
    <div>
    <h2>Phonebook</h2>

    <AddPerson
    addPerson = {addPerson}
    newName = {newName}
    handleNameChange = {handleNameChange}
    newNumber = {newNumber}
    handleNumberChange = {handleNumberChange}/>

    <FilterPeople
    filter = {filter}
    handleFilterChange = {handleFilterChange}/>

    <Numbers people = {peopleToShow}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))