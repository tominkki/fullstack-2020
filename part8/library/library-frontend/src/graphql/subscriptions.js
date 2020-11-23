import { gql } from '@apollo/client';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        id
        name
        born
      }
      id
      genres
    }
  }
`;

export { BOOK_ADDED };
