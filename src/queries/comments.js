import {gql} from 'apollo-boost';

export default gql`
query getComments($note: ID!){
  comments (note: $note) {
    id,
    content,
    sender,
    senderDetails {
        name
    }
  }
}
`;