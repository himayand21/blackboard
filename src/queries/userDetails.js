import {gql} from 'apollo-boost';

export default gql`
query getUserDetails {
  userDetail {
    name,
    id,
    email,
    connections,
    connectionDetails {
      name,
      email,
      id
    }
  }
}
`;