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

const getUserQuery = gql`
    {
        users {
            username
            id
        }
    }
`;

export { 
    getAuthorsQuery, 
    getBooksQuery,
    getUserQuery
};