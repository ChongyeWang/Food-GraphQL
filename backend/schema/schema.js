const graphql = require('graphql');
const user = require('../models/user.js');
const User = require("../models/user.js");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

var users = [
    {  username: 'Name of the Wind', email: 'Fantasy', id: '1' },
    { username: 'The Final Empire', email: 'Fantasy', id: '2' },
  
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        // author: {
        //     type: AuthorType,
        //     resolve(parent, args) {
        //         return authors.find(author => author.id === parent.authorId);
        //     }
        // }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find(book => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id === args.id );
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        },

        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});;
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                let author = {
                    name: args.name,
                    age: args.age,
                    id: args.id
                };
                authors.push(author)
                console.log("Authors", authors);
                return author;
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                let book = {
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    id: books.length+1
                }
                books.push(book);
                return book;
            }
        },

        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                address: { type: GraphQLString },
            },
            async resolve(parent, args) {
                var username = "";
                let result = await User.findOne({username: args.username});
                // {
                
                //     if (user) {
                //         username = null;
                //     }
                //     else {
                //         console.log(args)
                //         const user = new User(
                //         {
                //             username: args.username,
                //             password: args.password,
                //             email: args.email,
                //             phone: args.phone,
                //             address: args.address,
                //             // id: users.length+1
                //         });
                //         user.save();

                //         username = args.username
                //     }
                    
                // });
                if (result != null) {
                    return {'username': null}
                }
                else {
                    const user = new User(
                    {
                        username: args.username,
                        password: args.password,
                        email: args.email,
                        phone: args.phone,
                        address: args.address,
                        // id: users.length+1
                    });
                    user.save();
                    return {'username': args.username}
                }
                
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;