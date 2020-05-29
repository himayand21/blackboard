import {gql} from 'apollo-boost';

export default gql`
mutation addUser($id: ID, $name: String, $email: String) {
  addUser(id: $id, name: $name, email: $email) {
    name
  }
}
`;