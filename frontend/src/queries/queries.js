import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

const getRestaurantQuery = gql`
    query getRestaurantQuery($id: ID){
        restaurant (id: $id) {
            username
            name
            phone
            location
            dish
            review
            order
        }
    }
`;


const getUserQuery = gql`
    query getUserQuery($id: ID){
        user (id: $id) {
            username
            email
            phone
            address
            order
        }
    }
`;




export { 
    getAuthorsQuery, 
    getBooksQuery,
    getRestaurantQuery,
    getUserQuery,
};