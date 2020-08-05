import {gql} from 'apollo-boost';

export default gql`
mutation addConnection($connection: ID) {
  addConnection(connection: $connection) {
    name,
    id
  }
}
`;