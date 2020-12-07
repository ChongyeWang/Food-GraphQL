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

var users = [
    {  username: 'Name of the Wind', email: 'Fantasy', id: '1' },
    { username: 'The Final Empire', email: 'Fantasy', id: '2' },
  
];



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
        orderId: { type: GraphQLString },
        restaurantId: { type: GraphQLString },
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
        keyword: { type: GraphQLString },
        search: { type: GraphQLString },
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: {
        
        user: {
            type: UserType,
            description: "Get user",
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
            description: "Get Users",
            resolve(parent, args) {
                return User.find({});;
            }
        },

        restaurant: {
            type: RestaurantType,
            description: "Get restaurant",
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
            description: "Get restaurants",
            resolve(parent, args) {
                return Restaurant.find({});;
            }
        },

        searchRestaurants: {
            type: RestaurantType,
            description: "Search Restaurants",
            args: { keyword: { type: GraphQLString } },
            async resolve(parent, args) {
                let keyword = args.keyword;
                let result = await Restaurant.find({});
                console.log(result)
                let restaurant = [];
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name && result[i].name.includes(keyword)) {
                        restaurant.push({'name':result[i].name, 'id':result[i]._id});
                        continue;
                    }
                    if (result[i].location && result[i].location.includes(keyword)) {
                        restaurant.push({'name':result[i].name, 'id':result[i]._id});
                        continue;
                    }
                    for (var j = 0; j < result[i].dish.length; j++) {
                        if (result[i].dish[j].name && result[i].dish[j].name.includes(keyword)) {
                            restaurant.push({'name':result[i].name, 'id':result[i]._id});
                            break;
                        }
                    }
                }
                return {'search': JSON.stringify(restaurant)};
            }
        },
        
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        
        addUser: {
            description: "Add User",
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
            description: "Login User",
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
            description: "Add Restaurant",
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
            type: RestaurantType,
            description: "Login as restaurant",
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
            description: "Edit restaurant information",
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
            description: "Edit user information",
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
            description: "Add dish",
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
            description: "Place order",
            args: {
                restaurantId: { type: GraphQLString },
                userId: { type: GraphQLString },
                content: { type: GraphQLString },
                status: { type: GraphQLString },
            },
            async resolve(parent, args) {
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

        updateOrder: {
            type: OrderType,
            description: "Update status of order",
            args: {
                restaurantId: { type: GraphQLString },
                orderId: { type: GraphQLString },
            },
            async resolve(parent, args) {
                let result = await Restaurant.update(
                    { _id: args.restaurantId, "order._id" : args.orderId},
                    {$set : {"order.$.status" : "Delivered"}},
                ) ;
                return {'orderId': args.orderId}
            }
        },

    }
});


const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;