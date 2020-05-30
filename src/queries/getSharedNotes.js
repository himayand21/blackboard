import {gql} from 'apollo-boost';

export default gql`
query getSharedNotes($id: ID!){
    getSharedNotes (id: $id) {
        id,
        name,
        description,
        board,
        boardDetails {
            color
        }
        editor,
        time,
        owner,
        ownerDetails {
            name
        },
        sharedWith,
        sharedWithDetails {
            name,
            id,
            email
        }
        comments {
            id,
            content,
            time,
            senderDetails {
                name
            }
        }
    }
}
`;