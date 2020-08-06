import {gql} from 'apollo-boost';

export default gql`
mutation toggleShareWithEveryone($id: ID, $sharedWithEveryone: Boolean) {
    toggleShareWithEveryone(id: $id, sharedWithEveryone: $sharedWithEveryone) {
        sharedWithEveryone
    }
}
`;