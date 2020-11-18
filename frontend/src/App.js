import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
// components
import Register from './components/Register';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

import './App.css';
// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>List of Books</h1>
                
                <BrowserRouter>
                  <div>
                  {/* <BookList />
                <AddBook /> */}
                
                  <Route path="/users/register" component={Register}/>
                  <Route path="/e" component={BookList}/>
                <Route path="/e" component={AddBook}/>
            
                  </div>
                </BrowserRouter>
                

            </div>
        </ApolloProvider>
    );
  }
}
export default App;