import React, {Component} from 'react';
import { getRestaurantsQuery } from '../queries/queries';
import { searchRestaurantsQuery } from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'
//Define a Login Component
class Restaurants extends Component{
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            search : []
        }    
    }

    
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
    KeyChangeHandler = (e) => {
        var keyword = e.target.value;
        console.log(keyword)
        this.props.client.query({
            query: searchRestaurantsQuery,
            variables: {
                keyword : keyword,
            },
            
        }).then(data => {

            const result = JSON.parse(data.data.searchRestaurants.search);
            this.setState({
                search: result
            });
        });
    }

    render(){
        var serachItems = this.state.search.map(r => (
            <li key={r.id} style={{fontWeight: "bold", fontSize: "25px", marginLeft: "220px", marginRight: "30px"}}>
            {r.name} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            <a style={{marginLeft: "30px"}} href={'/restaurant-profile/' + r.id}>View Details</a>
            </li>))

        // console.log(this.props.data.restaurants);

        return(
            <div>
                <div class="" style={{marginTop:'30px', width:'500px', marginLeft: '220px'}}>
                    <h3 style={{fontWeight: 'bold'}}>Search Restaurant</h3>
                    <div class="panel">
                    </div>
                    <div class="form-group">
                        <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search with restaurant name, location, dish name"/>
                    </div> 
                </div>
                {serachItems}

                <ul id="res-list">
                    <h1 style={{fontWeight: "bold", marginLeft: "180px", marginTop: "10px"}}>All Restaurants</h1>
                    { this.displayRes() }
                </ul>
            </div>
        );
    }
}


// export default graphql(getRestaurantsQuery, searchRestaurantsQuery)(Restaurants);


export default compose(
    withApollo,
    graphql(getRestaurantsQuery, searchRestaurantsQuery)

)(Restaurants);