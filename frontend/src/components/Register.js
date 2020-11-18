import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import {  getUserQuery } from '../queries/queries';
import { addUserMutation } from '../mutation/mutations';


// import {Redirect} from 'react-router';


//Define a Login Component
class Register extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            email : "",
            phone: "",
            web : "",
            like : "",
            address: "",
            authFlag : false,
            message : false
        }
        this.submitRegister = this.submitRegister.bind(this);
        
    }

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

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }


    addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    displayUsers(){
        var data = this.props.getUserQuery;

        return data.users.map(user => {
            return( <li key={ user.id } value={user.id}>{ user.usernmae }</li> );
        });
        
    }
    submitRegister(e){
        e.preventDefault()
        try {
            this.props.addUserMutation({
                variables: {
                    username : this.state.username,
                    password : this.state.password,
                    email : this.state.email,
                    phone : this.state.phone,
                    address : this.state.address,
                },
                // refetchQueries: [{ query: getUserQuery }]
                
            }).then(function(data) {
                let result = data.data.addUser.username;
                if (result == null) {
                    console.log(2)
                }
                else {
                    console.log(3);
                }
            });

        } catch {
            console.log(233333)
        }
        

    }



    render(){ 
        // let redirectVar = null;
        //  if (this.state.authFlag === true) {
        //     redirectVar = <Redirect to= "/users/login"/>;
        // }
        // let message = "New User Register.";
        // console.log(this.state.message);
        // if (this.state.message === true) {
        //     message = "Username Already Exists";
        // }
        return(
            <div>
                {/* {redirectVar} */}
                <div class="container">
                    
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                            <h2>Register</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address"/>
                                </div>
                                <button onClick = {this.submitRegister} class="btn btn-primary">Register</button>                 
                        </div>
                        {/* <p>{message}</p> */}

                        <a href={'/restaurant/register'}><h4>Open a New Restaurant</h4></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(getUserQuery, { name: "getUserQuery" }),
    graphql(addUserMutation, { name: "addUserMutation" }),
)(Register);
