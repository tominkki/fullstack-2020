import React from 'react';
import { useField } from '../hooks/index';
import { useHistory } from 'react-router-dom';

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
      votes: 0
    });
    setNotification(`a new anecdote ${content.input.value} created!`);
    setTimeout(() => {
      setNotification('');
    }, 10000);
    history.push('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button>create</button>
        <button type='button' onClick={() => {content.reset(); author.reset(); info.reset();}}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
