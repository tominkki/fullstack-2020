import React from 'react';

const AddPerson = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <>
    <h3>Add new person</h3>
    <form onSubmit = {addPerson}>
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input value = {newName}
                onChange = {handleNameChange}/>
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td> 
              <input value = {newNumber} 
                onChange = {handleNumberChange}/>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

export default AddPerson;