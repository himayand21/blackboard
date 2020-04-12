import gql from 'graphql-tag';

export default gql`
query board ($id: ID!) {
  board (id: $id) {
    name,
    id,
    color,
    time,
    notes {
      id,
      name,
      description,
	  time,
      comments {
        id
      }
    }
  }
}
`;