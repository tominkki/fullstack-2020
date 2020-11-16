import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../graphql/queries';

const Recommend = ({ show }) => {

  const result = useQuery(ME,{
    fetchPolicy: 'network-only'
  });
  const [favBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if(result.data && result.data.me) {
      favBooks({
        variables: { genre: result.data.me.favoriteGenre }
      });
    }
  }, [result, favBooks]);

  if(!show) return null;

  if (loading || !data) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>Books in your favorite genre <b>{result.data.me.favoriteGenre}</b></p>
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
    </div>
  );
};

export default Recommend;
