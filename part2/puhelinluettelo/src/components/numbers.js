import React from 'react'
import Person from './person'

const Numbers = ({people, deletePerson}) => (
    <>
    <h2>Numbers</h2>
    <table>
      <tbody>
        {people.map((person) =>
        <Person key = {person.name} person = {person} deletePerson = {deletePerson}/>
        )}
      </tbody>
    </table>
    </>
)

export default Numbers