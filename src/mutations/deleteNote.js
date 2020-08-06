import {gql} from 'apollo-boost';

export default gql`
mutation deleteNote($id: ID) {
  deleteNote(id: $id) {
    name,
    id
  }
}
`;