import {gql} from 'apollo-boost';

export default gql`
query dashboardRefresh {
  userDetail {
    id,
    boards {
        id,
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