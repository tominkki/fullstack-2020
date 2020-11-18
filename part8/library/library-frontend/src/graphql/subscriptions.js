import { gql } from '@apollo/client';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

export { BOOK_ADDED };
