import {gql} from 'apollo-boost';

export default gql`
query ___composed($id: ID!) {
    boards:
    boards (user: $id) {
        name,
        id,
        user,
        color,
        time,
        notes {
            name,
            board,
            owner,
            id,
            time,
            pinned,
            boardDetails {
                color,
                name
            }
        }
    },
    recentNotes:
    getRecentNotes (id: $id) {
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
    },
    sharedNotes:
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
    },
    pinnedNotes:
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