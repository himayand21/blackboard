import {gql} from 'apollo-boost';

export default gql`
mutation addUser($id: ID, $name: String) {
  addUser(id: $id, name: $name) {
    name
  }
}
`;