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

const loginUserMutation = gql`
    mutation ($username: String, $password: String){
        loginUser(username: $username, password: $password){
            username,
            password,
            id
        }
    }
`;


const addRestaurantMutation = gql`
    mutation ($username: String, $password: String, $name: String, $phone: String, $location: String){
        addRestaurant(username: $username, password: $password, name: $name, phone: $phone, location: $location){
            username,
            password,
            name,
            phone,
            location
        }
    }
`;

const loginRestaurantMutation = gql`
    mutation ($username: String, $password: String){
        loginRestaurant(username: $username, password: $password){
            username,
            password,
            id
        }
    }
`;

const editRestaurantMutation = gql`
    mutation ($username: String, $name: String, $phone: String, $location: String){
        editRestaurant(username: $username, name: $name, phone: $phone, location: $location){
            username,
            name,
            phone,
            location
        }
    }
`;
const addDishMutation = gql`
    mutation ($username:String, $name: String, $category: String, $price: String){
        addDish(username: $username, name: $name, category: $category, price: $price){
            name,
            category,
            price,
        }
    }
`;

const editUserMutation = gql`
    mutation ($username: String, $email: String, $phone: String, $address: String){
        editUser(username: $username, email: $email, phone: $phone, address: $address){
            username,
            email,
            phone,
            address
        }
    }
`;

const addOrderMutation = gql`
    mutation ($restaurantId: String, $userId:String, $content: String, $status: String){
        addOrder(restaurantId: $restaurantId, userId: $userId, content: $content, status: $status){
            restaurantId,
            userId,
            content,
            status,
        }
    }
`;

export {
    addBookMutation,
    addUserMutation,
    loginUserMutation,
    addRestaurantMutation,
    loginRestaurantMutation,
    editRestaurantMutation,
    addDishMutation,
    editUserMutation,
    addOrderMutation,
};