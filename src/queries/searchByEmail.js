import {gql} from 'apollo-boost';

export default gql`
query searchByEmail ($note: ID!, $email: String) {
    searchByEmail(note: $note, email: $email) {
        id,
        name,
        email
    }
}
`;