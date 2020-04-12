import gql from 'graphql-tag';

export default gql`
mutation addNote($board: ID, $description: String, $name: String, $content: String, $editor: String) {
  addNote(board: $board, description: $description, name: $name, content: $content, editor: $editor) {
    name,
    description,
    board,
    id
  }
}
`;