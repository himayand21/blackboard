import {gql} from 'apollo-boost';

export default gql`
query searchUserByEmail ($email: String) {
    searchUserByEmail(email: $email) {
        id,
        name,
        email
    }
}
`;