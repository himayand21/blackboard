import {gql} from 'apollo-boost';

export default gql`
mutation removeConnection($connection: ID) {
  removeConnection(connection: $connection) {
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