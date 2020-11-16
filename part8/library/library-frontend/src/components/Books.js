import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';

const Filter = ({ getBooks }) => {
  const { loading, data } = useQuery(ALL_BOOKS);

  if(loading) return null;

  const genres = () => {
    let allGenres = [];
    data.allBooks.forEach(book => {
      allGenres = [...allGenres, ...book.genres.filter(
        g => !allGenres.includes(g)
      )];
    });
    return allGenres;
  };

  return(
    <div>
      {genres().map(g =>
        <button key={g}
          onClick={() => getBooks({ variables: { genre: g } })}>
          {g}
        </button>
      )}
      <button onClick={() => getBooks()}>all genres</button>
    </div>
  );
};

const Books = (props) => {

  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    getBooks();
  },[props.show, getBooks]);

  if (!props.show) {
    return null;
  }

  if(loading) {
    return (
      <div>
      loading...
      </div>
    );
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <Filter getBooks={getBooks}/>
    </div>
  );
};

export default Books;
