import {gql} from 'apollo-boost';

export default gql`
query getBoards ($user: ID!) {
  boards(user: $user) {
    name,
    id,
    user,
    color,
    time,
    notes {
        name,
        board,
        id
      }
    }
  }
`;