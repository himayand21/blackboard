import {gql} from 'apollo-boost';

export default gql`
mutation addBoard($name: String, $user: ID, $color: String) {
  addBoard(name: $name, user: $user, color: $color) {
    name,
    id,
    user,
    color,
    time
  }
}
`;