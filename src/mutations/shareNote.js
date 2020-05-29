import {gql} from 'apollo-boost';

export default gql`
mutation shareNote($id: ID, $sharingWith: ID, $sharingFrom: ID) {
    shareNote(id: $id, sharingWith: $sharingWith, sharingFrom: $sharingFrom) {
        id,
        name,
        sharedWith
    }
}
`;