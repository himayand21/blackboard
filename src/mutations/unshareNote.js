import {gql} from 'apollo-boost';

export default gql`
mutation unshareNote($id: ID, $unsharingWith: ID) {
    unshareNote(id: $id, unsharingWith: $unsharingWith) {
        id,
        name,
        sharedWith
    }
}
`;