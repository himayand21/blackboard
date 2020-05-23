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