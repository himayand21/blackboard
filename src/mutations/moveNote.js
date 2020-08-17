import {gql} from 'apollo-boost';

export default gql`
mutation moveNote($id: ID, $board: ID){
  moveNote (id: $id, board: $board) {
    id,
    board,
    boardDetails {
      color,
      id,
      name
    }
  }
}
`;