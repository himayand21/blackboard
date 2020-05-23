import {gql} from 'apollo-boost';

export default gql`
query getUserDetails ($id: ID!) {
  userDetail (id: $id) {
    name,
    id,
  }
}
`;