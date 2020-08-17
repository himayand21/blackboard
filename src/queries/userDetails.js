import {gql} from 'apollo-boost';

export default gql`
query getUserDetails {
  userDetail {
    id,
    name,
    email,
    connections,
    connectionDetails {
        name,
        email,
        id
    },
    boards {
        name,
        id,
        user,
        color,
        time,
        notes {
            name,
            id
        }
    },
    recentNotes {
        id,
        name,
        description,
        board,
        boardDetails {
            color,
            name,
            id
        }
        editor,
        time,
        owner,
        pinned,
        ownerDetails {
            name,
            id
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
                name,
                id
            }
        }
    },
    sharedNotes {
        id,
        name,
        description,
        board,
        boardDetails {
            color,
            id
        }
        editor,
        time,
        owner,
        ownerDetails {
            name,
            id
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
                name,
                id
            }
        }
    },
    pinnedNotes {
        id,
        name,
        description,
        board,
        boardDetails {
            color,
            id,
            name
        }
        editor,
        time,
        owner,
        pinned,
        ownerDetails {
            name,
            id
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
                name,
                id
            }
        }
    }
  }
}
`;