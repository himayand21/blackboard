import {gql} from 'apollo-boost';

export default gql`
query getPinnedNotes($id: ID!){
    getPinnedNotes (id: $id) {
        id,
        name,
        description,
        board,
        boardDetails {
            color,
            name
        }
        editor,
        time,
        owner,
        pinned,
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