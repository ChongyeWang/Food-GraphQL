const graphql = require('graphql');
const User = require("../models/user.js");
const Restaurant = require("../models/restaurant.js");

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
        order: { type: GraphQLString },
        // author: {
        //     type: AuthorType,
        //     resolve(parent, args) {
        //         return authors.find(author => author.id === parent.authorId);
        //     }
        // }
    })
});

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        price: { type: GraphQLString },
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        restaurantId: { type: GraphQLID },
        userId: { type: GraphQLString },
        content: { type: GraphQLString },
        status: { type: GraphQLString },
        date: { type: GraphQLString },
    })
});


const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        location: { type: GraphQLString },
        dish: { type: GraphQLString },
        review: { type: GraphQLString },
        order: { type: GraphQLString },
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
            async resolve(parent, args) {
                let result = await User.findById(args.id);
                return {
                    'username': result.username,
                    'email': result.email,
                    'phone': result.phone,
                    'address': result.address,
                    'order': JSON.stringify(result.order)
                };
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});;
            }
        },

        restaurant: {
            type: RestaurantType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                let result = await Restaurant.findById(args.id);
                return {
                    'username': result.username,
                    'name': result.name,
                    'phone': result.phone,
                    'location': result.location,
                    'dish': JSON.stringify(result.dish),
                    'review': JSON.stringify(result.review),
                    'order': JSON.stringify(result.order)
                };
            }
        },
        restaurants: {
            type: new GraphQLList(RestaurantType),
            resolve(parent, args) {
                return Restaurant.find({});;
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
                let result = await User.findOne({username: args.username});
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
        },

        loginUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await User.findOne({username: args.username, password: args.password});
                if (result != null) {
                    return {'username': args.username, 'id': result._id}
                }
                else {
                    return {'username': null}
                }
                
            }
        },

        addRestaurant: {
            type: RestaurantType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                name: { type: GraphQLString },
                phone: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await Restaurant.findOne({username: args.username});
                if (result != null) {
                    return {'username': null}
                    console.log(1)
                }
                else {
                    console.log(2)
                    const restaurant = new Restaurant(
                    {
                        username: args.username,
                        password: args.password,
                        name: args.name,
                        phone: args.phone,
                        location: args.location,
                        // id: users.length+1
                    });
                    restaurant.save();
                    return {'username': args.username}
                }
                
            }
        },

        loginRestaurant: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await Restaurant.findOne({username: args.username, password: args.password});
                if (result != null) {
                    return {'username': args.username, 'id': result._id}
                }
                else {
                    return {'username': null}
                }
                
            }
        },

        editRestaurant: {
            type: RestaurantType,
            args: {
                username: { type: GraphQLString },
                name: { type: GraphQLString },
                phone: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args.id)
                await Restaurant.update(
                    { username: args.username },
                    { 
                        name: args.name,
                        phone: args.phone,
                        location: args.location
                    },
                ) 
                return {'name': args.name}
            }
        },

        editUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
                address: { type: GraphQLString },
            },
            async resolve(parent, args) {
                console.log(args)
                await User.update(
                    { username: args.username },
                    { 
                        email: args.email,
                        phone: args.phone,
                        address: args.address
                    },
                ) 
                return {'name': args.name}
            }
        },


        addDish: {
            type: DishType,
            args: {
                username: { type: GraphQLString },
                name: { type: GraphQLString },
                category: { type: GraphQLString },
                price: { type: GraphQLString },
            },
            async resolve(parent, args) {
                await Restaurant.update(
                    { username: args.username },
                    { 
                        $push: { 
                            dish: {"name": args.name, "category": args.category, "price": args.price}
                            
                        } 
                    },
            
                ) 
                return {'name': args.name}
                
            }
        },

        addOrder: {
            type: OrderType,
            args: {
                restaurantId: { type: GraphQLString },
                userId: { type: GraphQLString },
                content: { type: GraphQLString },
                status: { type: GraphQLString },
            },

    
            async resolve(parent, args) {
                console.log(args);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); 
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;

                await Restaurant.update(
                    { _id: args.restaurantId },
                    { 
                        $push: 
                        { 
                            order: {"userId": args.userId, "content": args.content, "status": "Pending", "date": today}
                        } 
                    },
                    
                ) ;
                await User.update(
                    { _id: args.userId },
                    { 
                        $push: 
                        { 
                            order: {"restaurantId": args.restaurantId, "content": args.content, "status": "Pending", "date": today}
                        } 
                    },
                    
                ) ;
                return {'content': args.content}
                
            }
        },

    }
});


const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;