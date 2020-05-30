import {gql} from 'apollo-boost';

export default gql`
query getNote($id: ID!){
  note (id: $id) {
    id,
    name,
    description,
    board,
    editor,
    time,
    owner,
    sharedWith,
    boardDetails {
      color
    }
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