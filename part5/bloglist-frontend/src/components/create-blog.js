import React from 'react';

const CreateBlog = ({
  title, setTitle,
  author, setAuthor,
  url, setUrl,
  createBlog
}) => (
    <>
    <form onSubmit={createBlog}>
      <table>
        <tbody>
          <tr>
            <td>title: </td>
            <td>
            <input value = {title} 
              onChange = {({target}) => setTitle(target.value)}/>
            </td>
          </tr>
          <tr>
            <td>author: </td>
            <td>
            <input value = {author} 
              onChange = {({target}) => setAuthor(target.value)}/>
            </td>
          </tr>
          <tr>
            <td>url: </td>
            <td>
            <input value = {url} 
              onChange = {({target}) => setUrl(target.value)}/>
            </td>
          </tr>
        </tbody>
      </table>
      <div><button type="submit">create</button></div>
    </form>
    </>
);

export default CreateBlog;
