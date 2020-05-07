import gql from 'graphql-tag';

export default gql`
mutation deleteNote($id: ID) {
  deleteNote(id: $id) {
    name,
    id
  }
}
`;