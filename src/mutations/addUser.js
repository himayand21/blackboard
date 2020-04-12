import gql from 'graphql-tag';

export default gql`
mutation addUser($id: ID, $name: String) {
  addUser(id: $id, name: $name) {
    name
  }
}
`;