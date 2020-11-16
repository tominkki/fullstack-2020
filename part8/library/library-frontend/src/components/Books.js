import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql/queries';

const Filter = ({ getBooks, setGenre }) => {
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

  const handleClick = (genre) => {
    getBooks({ variables: { genre } });
    setGenre(genre);
  };

  return(
    <div>
      {genres().map(g =>
        <button key={g}
          onClick={() => handleClick(g)}>
          {g}
        </button>
      )}
      <button onClick={() => {getBooks(); setGenre('all genres');}}>all genres</button>
    </div>
  );
};

const Books = (props) => {

  const [genre, setGenre] = useState('all genres');
  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only'
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
      <p>in genre <b>{genre}</b></p>
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
      <Filter getBooks={getBooks} setGenre={setGenre}/>
    </div>
  );
};

export default Books;
