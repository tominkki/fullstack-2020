import { gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author 
      published
      genres
    }
  }
`;

export { ADD_BOOK };
