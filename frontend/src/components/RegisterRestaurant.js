import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { addRestaurantMutation } from '../mutation/mutations';
//Define a Login Component
class RegisterRestaurant extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            name : "",
            phone : "",
            location : "",
            authFlag : false,
            message : false,

        }

        this.submitRegister = this.submitRegister.bind(this);
        
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
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


    submitRegister(e){
        e.preventDefault()
        try {
            this.props.addRestaurantMutation({
                variables: {
                    username : this.state.username,
                    password : this.state.password,
                    name : this.state.name,
                    phone : this.state.phone,
                    location : this.state.location,
                },
                // refetchQueries: [{ query: getUserQuery }]
                
            }).then(data => {
                let result = data.data.addRestaurant.username;
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
                    console.log(1)
                }
            });

        } catch {
            console.log("error")
        }
    }

    

    render(){ 
        let redirectVar = null;
         if (this.state.authFlag === true) {
            redirectVar = <Redirect to= "/restaurant/login"/>;
        }


        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Register New Restaurant</h2>
                                
                            </div>
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Restaurant Name" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location" required/>
                                </div>
 
                                <button onClick = {this.submitRegister} class="btn btn-primary">Register</button>                 
                        </div>
                        
                        <a class="nav-item nav-link"><Link to="/restaurant-login" style={{color:'blue'}}>Already has one? Click here to Login.</Link></a>
                        
                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component

export default compose(
    graphql(addRestaurantMutation, { name: "addRestaurantMutation" }),

)(RegisterRestaurant);
