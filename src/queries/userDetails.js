import gql from "graphql-tag";

export default gql`
query getUserDetails ($id: ID!) {
  userDetail (id: $id) {
    name,
    id,
  }
}
`