import {gql} from 'apollo-boost';

export default gql`
mutation addComment($sender: ID, $content: String, $note: ID) {
  addComment(sender: $sender, content: $content, note: $note) {
    content
  }
}
`;