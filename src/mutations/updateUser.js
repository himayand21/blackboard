import {gql} from 'apollo-boost';

export default gql`
mutation updateUser($name: String) {
  updateUser(name: $name) {
    name,
    id
  }
}
`;