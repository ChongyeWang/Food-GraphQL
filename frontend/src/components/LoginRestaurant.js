import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { loginRestaurantMutation } from '../mutation/mutations';
import { graphql, compose } from 'react-apollo';

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            message: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        e.preventDefault()

        this.props.loginRestaurantMutation({
            variables: {
                username : this.state.username,
                password : this.state.password,
               
            },
            
        }).then(data => {
            let result = data.data.loginRestaurant.username;
            if (result == null) {
                console.log(result);
                this.setState({
                    authFlag: false
                });
            }
            else {
                console.log(result);
                localStorage.setItem("restaurant_username", result);
                localStorage.setItem("restaurant_id", data.data.loginRestaurant.id);
                localStorage.setItem("user_username", null);
                localStorage.setItem("user_id", null);
                this.setState({
                    authFlag: true
                });
            }
        });

    }

    render() {
        //redirect based on successful login
        let id = localStorage.getItem("restaurant_id")
        let redirectVar = null;
        if(this.state.authFlag === true){
            redirectVar = <Redirect to= {"/restaurant-profile/" + id}/>;
        }
        // if (this.state.token.length > 0) {
        //     localStorage.setItem("token", this.state.token);


            
        //     redirectVar = <Redirect to="/home" />
        // }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>User Login</h2>
                                <p>Please enter your username and password</p>
                            </div>
                            <form onSubmit={this.submitLogin}>
                                <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                                <div class="form-group">
                                    <input onChange={this.usernameChangeHandler} type="text" class="form-control" required name="username" placeholder="Username" />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" class="form-control" required name="password" placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(
    graphql(loginRestaurantMutation, { name: "loginRestaurantMutation" }),
)(Login);

// export default Login;