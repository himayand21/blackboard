import {gql} from 'apollo-boost';

export default gql`
mutation togglePinNote($id: ID, $pinned: Boolean) {
    togglePinNote(id: $id, pinned: $pinned) {
        id,
        recentNotes {
            id,
            pinned
        },
        pinnedNotes {
            id,
            pinned
        }
    }
}
`;