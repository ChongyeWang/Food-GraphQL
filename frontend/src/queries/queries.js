import { gql } from 'apollo-boost';

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

const getRestaurantsQuery = gql`
    {
        restaurants {
            name
            id
        }
    }
`;


const searchRestaurantsQuery = gql`
    query searchRestaurantsQuery($keyword: String){
        searchRestaurants (keyword: $keyword) {
            search
        }
    }
`;



export { 
    getRestaurantQuery,
    getUserQuery,
    getRestaurantsQuery,
    searchRestaurantsQuery,
};