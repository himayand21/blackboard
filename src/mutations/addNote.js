import {gql} from 'apollo-boost';

export default gql`
mutation addNote($board: ID, $description: String, $name: String, $editor: String) {
  addNote(board: $board, description: $description, name: $name, editor: $editor) {
    id,
    user,
    color,
    time,
    notes {
      id,
      name,
      description,
      sharedWith,
      sharedWithDetails {
        name,
        id
      }
	    time,
      board,
      owner,
      pinned,
      comments {
        time,
        senderDetails {
          name,
          id
        }
        id
      },
      sharedWithEveryone
    }
  }
}
`;