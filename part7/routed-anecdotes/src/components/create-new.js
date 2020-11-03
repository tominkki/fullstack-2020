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
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    setNotification(`a new anecdote ${content.value} created!`);
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
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
