import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
// components
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Nav from './components/Navbar';
import Home from './components/Home';
import './App.css';
import RegisterRestaurant from './components/RegisterRestaurant';
import LoginRestaurant from './components/LoginRestaurant';
import RestaurantProfile from './components/RestaurantProfile';
import RestaurantEdit from './components/RestaurantEdit';
import Dish from './components/Dish';
// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <BrowserRouter>
                  <div>
                  <Route path="/" component={Nav}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/users/register" component={Register}/>
                  <Route path="/users/login" component={Login}/>
                  <Route path="/restaurant/register" component={RegisterRestaurant}/>
                  <Route path="/restaurant/login" component={LoginRestaurant}/>
                  <Route path="/restaurant/edit" component={RestaurantEdit}/>
                  <Route path="/restaurant/addDish" component={Dish}/>
                  <Route path="/restaurant-profile/:id" component={RestaurantProfile}/>
                  <Route path="/logout" component={Logout}/>
            
                  </div>
                </BrowserRouter>
                

            </div>
        </ApolloProvider>
    );
  }
}
export default App;