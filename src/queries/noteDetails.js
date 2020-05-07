import gql from 'graphql-tag';

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
      sender
    }
  }
}
`;