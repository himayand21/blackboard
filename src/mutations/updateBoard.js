import {gql} from 'apollo-boost';

export default gql`
mutation updateBoard($name: String, $id: ID, $color: String) {
  updateBoard(name: $name, id: $id, color: $color) {
    name,
    id,
    user,
    color
  }
}
`;