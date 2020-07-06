import {gql} from 'apollo-boost';

export default gql`
mutation addUser($name: String, $email: String) {
  addUser(name: $name, email: $email) {
    name
  }
}
`;