import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { editRestaurantMutation } from '../mutation/mutations';
import {Link} from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
//Define a Login Component
class UserEdit extends Component{
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            phone : "",
            location : "",
            authFlag : false
        }
    }

    emaliChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    submitEdit = (e) => {
        console.log(localStorage.getItem("restaurant_username"))
        this.props.editRestaurantMutation({
            variables: {
                username: localStorage.getItem("restaurant_username"),
                name : this.state.email,
                phone : this.state.phone,
                location : this.state.location,
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            let result = data.data.editRestaurant;
            console.log(result)
            if (result == null) {
                this.setState({
                    authFlag: false
                });
                console.log(1)
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
        if(this.state.authFlag === true){
            redirectVar = <Redirect to= {"/user-profile/" + localStorage.getItem("user_id")}/>;
            
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Edit Profile</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.emaliChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                              
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                                </div>
                                <button onClick = {this.submitEdit} class="btn btn-primary">Edit</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default compose(
    graphql(editRestaurantMutation, { name: "editRestaurantMutation" }),

)(UserEdit);
