import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import AddPerson from './components/add-person';
import FilterPeople from './components/filter-people';
import Numbers from './components/numbers';
import Phonebook from './services/phonebook';
import Notification from './components/notifier';


const App = () =>{
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setNewFilter] = useState('');
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState();

    useEffect(() => {
        Phonebook.getAll()
            .then(setPersons)
            .catch(error => {
                notification(`Failed to fetch phonebook. ${error}`, true);
            });
            
    }, [setPersons, setMsg, setError]);

    const handleNameChange = (event) =>{
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value);
    };

    const handleFilterChange = (event) =>{
        setNewFilter(event.target.value);
    }; 

    const peopleToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()));
        
    const notification = (message, isError) => {
        isError ? setError(true) : setError(false);
        setMsg(message);
        setTimeout(() => {
            setMsg(null);
        }, 3000);
    };    

    const addPerson = (event) =>{
        event.preventDefault();
        const names = persons.map(person => (person.name.toLowerCase()));
        const numbers = persons.map(person => (person.number));

        if(names.includes(newName.toLowerCase())){

            if(window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
                const newPerson = {
                    name: newName,
                    number: newNumber,
                    id: persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase()).id
                };
        
                Phonebook.updateContact(newPerson)
                    .then(returnedPerson => {
                        Phonebook.getAll()
                            .then(initialContacts => {
                                setPersons(initialContacts);
                            });
                        notification(`Updated ${newPerson.name}`, false);
                    })
                    .catch(error => {
                        notification(`Could not update contact. ${error}`, true);
                    });
            }

            else{
                setNewName('');
                setNewNumber('');
            }
        }

        else if(numbers.includes(newNumber)){
            notification(`${newNumber} is already added to phonebook!`, true);
        }

        else if(newName !== '' && newNumber !== ''){
            const newPerson = {
                name: newName,
                number: newNumber,
                id: persons[persons.length - 1].id + 1
            };
        
            Phonebook.postNew(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(newPerson));
                    setNewName('');
                    setNewNumber('');
                    notification(`Added ${newPerson.name}`, false);
                })
                .catch(error => {
                    notification(`Could not add person to database. ${error}`, true);
                });
        }
    };

    const deletePerson = (person) => {

        if(!window.confirm(`Delete ${person.name}?`)){return;}

        Phonebook.deletePerson(person.id)
            .then(returnData => {
                console.log(returnData);

                const updatedPersons = persons.filter(p => (
                    p.id !== person.id
                ));

                setPersons(updatedPersons);
                notification(`Deleted ${person.name}`, false);
            })
            .catch(error => {
                notification(`Could not delete ${person.name}. ${error}`, true);
            });
    };
  
    return(
        <div>
            <h2>Phonebook</h2>
            <AddPerson
                addPerson = {addPerson}
                newName = {newName}
                handleNameChange = {handleNameChange}
                newNumber = {newNumber}
                handleNumberChange = {handleNumberChange}/>
            {msg !== null && <Notification msg = {msg} error = {error}/>}
            <FilterPeople
                filter = {filter}
                handleFilterChange = {handleFilterChange}/>
            <Numbers 
                people = {peopleToShow}
                deletePerson = {deletePerson}/>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
