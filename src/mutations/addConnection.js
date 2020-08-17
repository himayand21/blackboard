import {gql} from 'apollo-boost';

export default gql`
mutation addConnection($connection: ID) {
  addConnection(connection: $connection) {
    id,
    connections,
    connectionDetails {
      id,
      name,
      email
    }
  }
}
`;