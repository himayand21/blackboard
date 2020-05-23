import {gql} from 'apollo-boost';

export default gql`
mutation moveNote($id: String, $board: String){
  moveNote (id: $id, board: $board) {
    id,
    name,
    description,
    editor,
    board
  }
}
`;