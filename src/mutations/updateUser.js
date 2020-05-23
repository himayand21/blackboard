import {gql} from 'apollo-boost';

export default gql`
mutation updateUser($id: ID, $name: String) {
  updateUser(id: $id, name: $name) {
    name
  }
}
`;