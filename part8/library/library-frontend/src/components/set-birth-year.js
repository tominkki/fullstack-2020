import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries';
import { EDIT_AUTHOR } from '../graphql/mutations';
import Select from 'react-select';

const SetBirthYear = () => {

  const [author, setAuthor] = useState('');
  const [setBornTo, setYear] = useState('');

  const result = useQuery(ALL_AUTHORS);
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submitYear = async(e) => {
    e.preventDefault();

    if(author !== null && Number.isInteger(setBornTo)) {
      await editAuthor({ variables: { name: author.value, setBornTo: parseInt(setBornTo) } });
    }
    else {
      console.log('faulty input');
    }
    setAuthor(null);
    setYear('');
  };

  if(!result.data.allAuthors) return null;

  return(
    <div>
      <h3>Set birthyear</h3>
      <Select
        value={author}
        onChange={setAuthor}
        options={result.data.allAuthors.map(a => ({ value: a.name, label: a.name }))}
        placeholder='Select author'
      />
      <form onSubmit={submitYear}>
        <input
          type='number'
          placeholder='Birthyear'
          value={setBornTo}
          onChange={({ target }) => setYear(parseInt(target.value))}
        />
        <button type='submit'>
            update author
        </button>
      </form>
    </div>
  );
};

export default SetBirthYear;
