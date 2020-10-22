import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlog = ({ addBlog }) => {
  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const show = { display: visibility ? 'none' : '' };
  const hide = { display: visibility ? '' : 'none' };

  const createBlog = (event) => {
    event.preventDefault();
    addBlog({
      title: title,
      author: author,
      url: url
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <div style={show}><button onClick={() => setVisibility(true)}>create blog</button></div>
      <form onSubmit={createBlog} style={hide}>
        <table>
          <tbody>
            <tr>
              <td>title: </td>
              <td>
                <input value = {title}
                  onChange = {({ target }) => setTitle(target.value)}/>
              </td>
            </tr>
            <tr>
              <td>author: </td>
              <td>
                <input value = {author}
                  onChange = {({ target }) => setAuthor(target.value)}/>
              </td>
            </tr>
            <tr>
              <td>url: </td>
              <td>
                <input value = {url}
                  onChange = {({ target }) => setUrl(target.value)}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div><button type="submit">create</button></div>
      </form>
      <div style={hide}><button onClick={() => setVisibility(false)}>cancel</button></div>
    </>
  );
};

CreateBlog.propTypes = { addBlog: PropTypes.func.isRequired };

export default CreateBlog;
