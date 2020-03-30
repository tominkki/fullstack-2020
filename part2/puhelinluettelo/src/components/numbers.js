import React from 'react'
import Person from './person'

const Numbers = ({people}) => (
    <>
    <h2>Numbers</h2>
    <table>
      <tbody>
        {people.map((person) =>
        <Person key = {person.name} person = {person}/>
        )}
      </tbody>
    </table>
    </>
)

export default Numbers