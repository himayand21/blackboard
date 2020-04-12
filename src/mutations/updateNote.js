import gql from 'graphql-tag';

export default gql`
mutation updateNote($id: ID, $description: String, $name: String) {
  updateNote(id: $id, description: $description, name: $name) {
    name,
    description,
    board,
    id
  }
}
`;