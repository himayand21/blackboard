import gql from 'graphql-tag';

export default gql`
mutation deleteBoard($id: ID) {
  deleteBoard(id: $id) {
    name,
    id,
    user
  }
}
`;