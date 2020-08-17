import {gql} from 'apollo-boost';

export default gql`
mutation addBoard($name: String, $color: String) {
  addBoard(name: $name, color: $color) {
    id,
    boards {
        name,
        id,
        user,
        color,
        time,
        notes {
            id
        }
    }
  }
}
`;