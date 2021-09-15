import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
    // Piece of state that holds person objects.
    const [persons, setPersons] = useState([])
    // State that holds name input.
    const [newName, setNewName] = useState('')
    // State that holds number input.
    const [newNumber, setNewNumber] = useState('')
    // State that holds the filter input.
    const [nameFilter, setNameFilter] = useState('')

    // Effect hook to fetch data from json-server.
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    // This event handler function runs when form is submitted.
    const addPerson = (event) => {
        event.preventDefault() // Prevent page reload.
        // Create new person object.
        const personObject = {
            name: newName,
            number: newNumber,
        }
        // If person's name is already in the phonebook, alert user.
        // Make lowercase to handle case insensitive inputs.
        if (persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length > 0) {
            alert(`${newName} is already added to the phonebook`)
        } else { // If not already in phonebook, concatenate to persons state.
            axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                })
        }
        setNewName('') // Clear the name input box.
        setNewNumber('') // Clear the number input box.
    }

    // On change event handler for name input box.
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    // On change event handler for number input box.
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    // On change event handler for name filter input box.
    const handleNameFilter = (event) => {
        setNameFilter(event.target.value)
    }

    // Filter the persons to display.
    const personsToShow = persons.filter(person => {
        // New array will hold persons that include the name filter input.
        return person.name.toLowerCase().includes(nameFilter.toLowerCase())
    })

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={nameFilter} changeHandler={handleNameFilter} />
            <h2>Add a new</h2>
            <PersonForm
                submitHandler={addPerson}
                name={newName}
                nameHandler={handleNameChange}
                number={newNumber}
                numberHandler={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons displayArray={personsToShow} />
        </div>
    )
}

export default App