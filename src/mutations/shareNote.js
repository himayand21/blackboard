import {gql} from 'apollo-boost';

export default gql`
mutation shareNote($id: ID, $sharingWith: ID) {
    shareNote(id: $id, sharingWith: $sharingWith) {
        id,
        name,
        sharedWith,
        sharedWithDetails {
            id,
            name
        }
    }
}
`;