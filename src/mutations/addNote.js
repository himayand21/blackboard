import {gql} from 'apollo-boost';

export default gql`
mutation addNote($board: ID, $description: String, $name: String, $editor: String) {
  addNote(board: $board, description: $description, name: $name, editor: $editor) {
    name,
    description,
    board,
    id,
    editor,
    owner,
    comments {
      content
    }
  }
}
`;