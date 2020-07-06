import {gql} from 'apollo-boost';

export default gql`
mutation addComment($content: String, $note: ID) {
  addComment(content: $content, note: $note) {
    content
  }
}
`;