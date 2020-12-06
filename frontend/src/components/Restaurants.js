import React, {Component} from 'react';
import { getRestaurantsQuery } from '../queries/queries';
import {Link} from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
//Define a Login Component
class Restaurants extends Component{
    displayRes(){
        var data = this.props.data;
        if(data.loading){
            return( <div>Loading Restaurants...</div> );
        } else {
            return data.restaurants.map(restaurant => {
                return(
                    <li style={{fontWeight: "bold", fontSize: "25px", marginLeft: "200px", marginRight: "30px"}} key={ restaurant.id }>{ restaurant.name }
                    <a style={{marginLeft: "30px"}} href={'/restaurant-profile/' + restaurant.id}>View Details</a>
                    </li>
                );
            })
        }
    }
    render(){
        console.log(this.props.data.restaurants);
        return(
            <div>
                <ul id="book-list">
                    <h1 style={{fontWeight: "bold", marginLeft: "180px", marginTop: "10px"}}>All Restaurants</h1>
                    { this.displayRes() }
                </ul>
            </div>
        );
    }
}

//export Register Component
export default graphql(getRestaurantsQuery)(Restaurants);