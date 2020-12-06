import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { editUserMutation } from '../mutation/mutations';
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
            address : "",
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
            address : e.target.value
        })
    }

    submitEdit = (e) => {
        console.log(localStorage.getItem("restaurant_username"))
        this.props.editUserMutation({
            variables: {
                username: localStorage.getItem("user_username"),
                email : this.state.email,
                phone : this.state.phone,
                address : this.state.address,
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            let result = data.data.editUser;
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
                                    <input onChange = {this.emaliChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
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
    graphql(editUserMutation, { name: "editUserMutation" }),

)(UserEdit);
