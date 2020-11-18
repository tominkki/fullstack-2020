import React, { useEffect, useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED } from './graphql/subscriptions';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/login';
import NewBook from './components/NewBook';
import Recommend from './components/recommend';

const App = () => {

  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-token');
    if(token){
      setToken(token);
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      window.alert(
        `Book added!\n
        Title: ${book.title}\n
        Author: ${book.author.name}\n
        Published: ${book.published}`
      );
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.removeItem('library-token');
    client.resetStore();
    if(page === 'add' || page === 'recommend'){
      setPage('authors');
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </>
        }
        {!token ?
          <button onClick={() => setPage('login')}>login</button>
          :
          <button onClick={logout}>logout</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />
      <Recommend
        show={page === 'recommend'}
      />
    </div>
  );
};

export default App;
