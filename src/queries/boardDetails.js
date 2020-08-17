import {gql} from 'apollo-boost';

export default gql`
query board ($id: ID!) {
  board (id: $id) {
    name,
    id,
    color,
    time,
	  user,
    userDetails {
      id
    }
    notes {
      id,
      name,
      description,
      sharedWith,
      sharedWithDetails {
        name,
        id
      }
	    time,
      board,
      owner,
      pinned,
      comments {
        id,
        time,
        senderDetails {
          name,
          id
        }
      },
      sharedWithEveryone
    }
  }
}
`;