import {gql} from 'apollo-boost';

export default gql`
mutation deleteNote($id: ID) {
  deleteNote(id: $id) {
    id,
    recentNotes {
      id
    },
    pinnedNotes {
      id
    },
    boards {
      id,
      notes {
        id
      }
    }
  }
}
`;