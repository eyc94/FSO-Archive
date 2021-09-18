import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

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
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
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
            // Message to display to user.
            const msg = `${newName} is already added to the phonebook, replace the old number with a new one?`
            // If the user confirms the message.
            if (window.confirm(msg)) {
                // Find the person in the array to change by filtering based on newName entered.
                // This is an array so return the first position.
                const personToChange = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())[0]
                // Copy the existing person properties other than the new number into the new person object.
                const changedPerson = { ...personToChange, number: newNumber }
                // Call axios put method from our service file.
                personService
                    .update(personToChange.id, changedPerson) // Pass person's id that we got from filtering and pass in new person to update with.
                    .then(returnedPerson => {
                        // Change the state of the persons array so that we can render new number to page.
                        setPersons(persons.map(person => person.id !== personToChange.id ? person : returnedPerson))
                    })
            }
        } else { // If not already in phonebook, concatenate to persons state.
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        }
        setNewName('') // Clear the name input box.
        setNewNumber('') // Clear the number input box.
    }

    // On click handler for delete button.
    const deletePerson = e => {
        // We passed in the person object into the event handler.
        // We can access the id and name properties.
        const id = e.id
        const name = e.name
        const msg = `Delete ${name}?`

        // Display a confirmation box to delete.
        if (window.confirm(msg)) {
            personService
                .del(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
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
            <Persons delPerson={deletePerson} displayArray={personsToShow} />
        </div>
    )
}

export default App