
import { gql } from 'apollo-boost';

const addBookMutation = gql`
    mutation ($name: String, $genre: String, $authorId: ID){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addUserMutation = gql`
    mutation ($username: String, $password: String, $email: String, $phone: String, $address: String){
        addUser(username: $username, password: $password, email: $email, phone: $phone, address: $address){
            username,
            password,
            email,
            phone,
            address
        }
    }
`;


export {
    addBookMutation,
    addUserMutation
}
;