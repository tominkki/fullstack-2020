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

export default { ALL_AUTHORS };
