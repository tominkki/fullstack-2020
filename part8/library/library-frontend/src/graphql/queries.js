import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks (
      author: $author
      genre: $genre
    ){
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

export { ALL_AUTHORS, ALL_BOOKS, ME };
