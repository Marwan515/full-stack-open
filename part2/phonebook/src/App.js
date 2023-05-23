import React from 'react'
import { useState, useEffect } from 'react'
import phoneBookService from './services/phonebooks'
import AddPerson from './components/addPerson'
import Person from './components/person'
import Searchfilter from './components/searchFilter'
import MessageAlert from './components/messageAlerts'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState(null) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [updatePersons, setUpdatePersons] = useState(null)

  const personsToShow = showAll ? persons : persons.filter(i => {
    if (i.name.toLowerCase().includes(newFilter.toLowerCase()) || i.number.toLowerCase().includes(newFilter.toLowerCase())) {
      return true
    } else {
      return false
    }
  })

  useEffect(() => {
    phoneBookService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [updatePersons])

  const filterInput = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const nameInput = (event) => {
    setNewName(event.target.value)
  }

  const numberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let existingContact = persons.find(o => o.name.toLowerCase() === newName.toLowerCase())
    if (newName.length < 1 || newNumber.length < 1) {
      setMessage('Name or Number cant be blank!')
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 2500)
    } else if (existingContact) {
      if (window.confirm(`${existingContact.name} is already added to the phonebook, Replace the old number with the new one ?`)) {
        existingContact.number = newNumber
        phoneBookService
          .updateContact(existingContact.id, existingContact)
          .then(res => {
            setUpdatePersons('updated contact')
            setNewName('')
            setNewNumber('')
            setMessage(`${existingContact.name}'s details Has Been have been updated!`)
            setMessageType('success')
            setTimeout(() => {
            setMessage(null)
            setMessageType(null)
            }, 2500)
          })
          .catch(err => {
            setMessage(err.error)
            setMessageType('error')
            setTimeout(() => {
            setMessage(null)
            setNewName('')
            setNewNumber('')
            setMessageType(null)
            }, 2500)
            setUpdatePersons('errorUpdated')
          })
      }
    } else {
      phoneBookService
        .create({name: newName, phoneNumber: newNumber})
        .then(rc => {
          setMessage(`${newName} Has Been added to the Phonebook!`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 2500)
          setUpdatePersons(rc.data)
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          setMessage(err.response.data.error)
          setMessageType('error')
          setTimeout(() => {
          setMessage(null)
          setNewName('')
          setNewNumber('')
          setMessageType(null)
          }, 4500)
          setUpdatePersons('errorUpdated')
        })
    }
  }
  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${event.target.getAttribute('data-name')} ?`)) {
      phoneBookService
        .deleteContact(event.target.value)
        .then(r => {
          setUpdatePersons("deleted")
          setMessage(`${event.target.getAttribute('data-name')} Has Been deleted!`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 2500)
        })
        .catch(err => {
          setMessage(err.error)
          setMessageType('error')
          setTimeout(() => {
          setMessage(null)
          setNewName('')
          setNewNumber('')
          setMessageType(null)
          }, 2500)
          setUpdatePersons('errorUpdatedDel')
        })
    }
  }

  const showInfo = (event) => {
    event.preventDefault()
    phoneBookService
      .bookInfo()
      .then(info => {
      setMessage(info)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2750)
      })
      .catch(err => {
        setMessage(err.error)
        setMessageType('error')
        setTimeout(() => {
        setMessage(null)
        setNewName('')
        setNewNumber('')
        setMessageType(null)
        }, 2500)
        setUpdatePersons('errorUpdatedDel')
      })
  }

  return (
    <div>
      <h2 className='title'>Phonebook</h2>
      <br />
      <button onClick={showInfo}>Show phonebook info</button>
      <br />
      {newMessage && <MessageAlert message={newMessage} ttm={messageType} />}
      <br />
      <Searchfilter val={newFilter} oc={filterInput} />
      <br/>
      <AddPerson os={addPerson} nval={newName} noc={nameInput} numval={newNumber} numoc={numberInput} />
      <h2>Numbers</h2>
      <div>
        {persons && personsToShow.map(i => <Person key={i.id} name={i.name} number={i.number} dval={i.id} dFun={deletePerson} />)}
      </div>
    </div>
  )
}

export default App