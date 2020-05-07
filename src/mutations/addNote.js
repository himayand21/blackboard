import gql from 'graphql-tag';

export default gql`
mutation addNote($board: ID, $description: String, $name: String, $editor: String, $owner: String) {
  addNote(board: $board, description: $description, name: $name, editor: $editor, owner: $owner) {
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