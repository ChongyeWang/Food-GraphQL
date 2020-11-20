import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { addDishMutation } from '../mutation/mutations';
import { graphql, compose } from 'react-apollo';

class Dish extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            price : "",
            category : "",
            authFlag: false
        }
        
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    priceChangeHandler = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    categoryChangeHandler = (e) => {
        this.setState({
            category : e.target.value
        })
    }

    submitDish = (e) => {
        this.props.addDishMutation({
            variables: {
                username: localStorage.getItem("restaurant_username"),
                name : this.state.name,
                category : this.state.category,
                price : this.state.price,
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            let result = data.data.addDish;
            console.log(result)
            if (result == null) {
                this.setState({
                    authFlag: false
                });
            }
            else {
                this.setState({
                    authFlag: true
                });
            }
        });

    }

    render(){ 
        let redirectVar = null;
        if (this.state.authFlag === true) {
            redirectVar = <Redirect to= {"/restaurant-profile/" + localStorage.getItem("restaurant_id")}/>;
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Add Dish</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.priceChangeHandler} type="text" class="form-control" name="price" placeholder="Price"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.categoryChangeHandler} type="text" class="form-control" name="category" placeholder="Category"/>
                                </div>
                                <button onClick = {this.submitDish} class="btn btn-primary">Add</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component

export default compose(
    graphql(addDishMutation, { name: "addDishMutation" }),
)(Dish);
