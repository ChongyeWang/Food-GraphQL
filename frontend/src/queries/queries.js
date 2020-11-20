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
        }
    }
`;



export { 
    getAuthorsQuery, 
    getBooksQuery,
    getRestaurantQuery,
};