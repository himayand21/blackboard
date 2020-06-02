import {gql} from 'apollo-boost';

export default gql`
mutation updateNote($id: ID, $name: String, $description: String, $editor: String){
  updateNote (id: $id, name: $name, description: $description, editor: $editor) {
    id,
    name,
    description,
    editor,
    board,
    boardDetails {
      color
    }
  }
}
`;