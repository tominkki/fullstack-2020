import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AddPerson from './components/add-person';
import FilterPeople from './components/filter-people';
import Numbers from './components/numbers';
import Phonebook from './services/phonebook';


const App = () =>{

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    Phonebook.getAll()
    .then(initialContacts => {
      setPersons(initialContacts);
    })
  }, [])

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
  persons : persons.filter(person => 
    (person.name.toLowerCase().includes(filter.toLowerCase())))
    

  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => (person.name.toLowerCase()))
    const numbers = persons.map(person => (person.number))

    if(names.includes(newName.toLowerCase())){
      window.alert(`${newName} is already added to phonebook!`)
      setNewName('');
      setNewNumber('');
    }

    else if(numbers.includes(newNumber)){
      window.alert(`${newNumber} is already added to phonebook!`)
      setNewName('');
      setNewNumber('')
    }

    else if(newName !== '' && newNumber !== ''){
        const newPerson = {
        name: newName,
        number: newNumber
      }
      
      Phonebook.postNew(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      })
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