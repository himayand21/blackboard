import {gql} from 'apollo-boost';

export default gql`
mutation moveNote($id: ID, $board: ID){
  moveNote (id: $id, board: $board) {
    id,
    name,
    description,
    editor,
    board
  }
}
`;