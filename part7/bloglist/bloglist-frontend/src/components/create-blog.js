import React from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blog-reducer';
import { useField, useVisibility } from '../hooks/hooks';

const CreateBlog = () => {

  const dispatch = useDispatch();

  const visibility = useVisibility(false);
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const show = { display: visibility.value ? 'none' : '' };
  const hide = { display: visibility.value ? '' : 'none' };

  const createBlog = e => {
    e.preventDefault();
    dispatch(
      addBlog({
        title: title.input.value,
        author: author.input.value,
        url: url.input.value
      })
    );
    [title, author, url].map(state => state.reset());
  };

  return (
    <>
      <div style={show}><button {...visibility.btn}>create blog</button></div>
      <form onSubmit={createBlog} style={hide}>
        <table>
          <tbody>
            <tr>
              <td>title: </td>
              <td>
                <input id = 'title' {...title.input}/>
              </td>
            </tr>
            <tr>
              <td>author: </td>
              <td>
                <input id = 'author' {...author.input}/>
              </td>
            </tr>
            <tr>
              <td>url: </td>
              <td>
                <input id = 'url' {...url.input}/>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button id='create-btn' type='submit'>create</button>
          <button type='button' {...visibility.btn}>cancel</button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
