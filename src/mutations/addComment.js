import {gql} from 'apollo-boost';

export default gql`
mutation addComment($content: String, $note: ID) {
  addComment(content: $content, note: $note) {
    id,
    comments {
      id,
      content,
      time,
      senderDetails {
        name,
        id
      }
    }
  }
}
`;