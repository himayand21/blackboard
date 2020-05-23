import {gql} from 'apollo-boost';

export default gql`
mutation deleteBoard($id: ID) {
  deleteBoard(id: $id) {
    name,
    id,
    user
  }
}
`;