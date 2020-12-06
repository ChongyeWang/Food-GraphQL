import React, {Component} from 'react';
import {Redirect} from 'react-router';

import { getUserQuery } from '../queries/queries';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'

//Define a Login Component
class UserPage extends Component{
    constructor(){
        super();
        this.state = {
            name : "",
            email: "",
            phone: "",
            address: "",
            order: [],
        }
        
    }  

    //get the data from backend  
    componentDidMount(){
        
        var id = this.props.match.params.id;
    
        this.props.client.query({
            query: getUserQuery,
            variables: {
                id : id,
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            console.log(data.data.user)
            this.setState({
                username: data.data.user.username,
                email: data.data.user.email,
                phone: data.data.user.phone,
                address: data.data.user.address,
                order: JSON.parse(data.data.user.order)
            });
        });
    }


    render(){
        var username = this.state.username;
        var email = this.state.email;
        var phone = this.state.phone;
        var address = this.state.address;
        var order = this.state.order;

        var id = localStorage.getItem("user_id");

        var orderItems = order.map(r => (
            <li key={r._id}>
            {r.content} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            {r.date} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            {r.status}
            </li>))


        return(
            <div>
                <div style={{marginLeft: '110px', marginTop: '10px'}}>

                    <h3>Userame : {username}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Address : {address}</h3>

                    <h3><a href={'/user/edit'}>Edit Profile Information</a></h3>

                    {orderItems}

                </div>  
             
            </div> 


        )
    }   
}


export default compose(
    withApollo,
    graphql(getUserQuery, { name: "getUserQuery" }),

)(UserPage);

// export default UserPage;