import React, {Component} from 'react';
import { getRestaurantQuery } from '../queries/queries';
import { addOrderMutation } from '../mutation/mutations';
import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo'
import {Link} from 'react-router-dom';

//Define a Login Component
class RestaurantProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            name : "",
            phone: "",
            location: "",
            dish: [],
            review: "",
            reviews: [],
            order: []


        }
        this.handleClick = this.handleClick.bind(this);
        this.placeOrder = this.placeOrder.bind(this);

    }  

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    

    //get the data from backend  
    componentDidMount(){
        var id = this.props.match.params.id;
    
        this.props.client.query({
            query: getRestaurantQuery,
            variables: {
                id : id,
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            this.setState({
                username: data.data.restaurant.username,
                name: data.data.restaurant.name,
                phone: data.data.restaurant.phone,
                location: data.data.restaurant.location,
                dish: JSON.parse(data.data.restaurant.dish),
                reviews: JSON.parse(data.data.restaurant.review),
                order: JSON.parse(data.data.restaurant.order)
            });
        });

    }

    placeOrder(e) {
        console.log(localStorage.getItem("user_id"));
        this.props.addOrderMutation({
            variables: {
                restaurantId: this.props.match.params.id,
                userId: localStorage.getItem("user_id"),
                content : localStorage.getItem("order"),
                status : 'Pending',
            },
            // refetchQueries: [{ query: getUserQuery }]
            
        }).then(data => {
            let result = data.data.addOrder;
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

    reviewChangeHandler = (e) => {
        this.setState({
            review : e.target.value
        })
    }

    addReview = (e) => {
        // const data = {
        //     restaurantId: this.props.match.params.id,
        //     userId: localStorage.getItem("user_id"),
        //     review: this.state.review
        // }
        // axios.post('/restaurant/add_review', data)
        // .then(response => {
        //     alert("Review Added!");
        // })
    }

    addDish = (id) => {
        if (localStorage.getItem('order') == null) {
            localStorage.setItem('order', id);
        }
        else {
            localStorage.setItem('order', localStorage.getItem('order').concat(",").concat(id));
        }
      }

      

    render(){
    
        var username = this.state.username;
        var name = this.state.name;

        var phone = this.state.phone;
        var location = this.state.location;
        var dish = this.state.dish;
        var reviews = this.state.reviews;
        var order = this.state.order;
        

        var dishItems = dish.map(d => (
            <li key={d._id}>
              {d.name} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
              {d.category} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
              {d.price} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
              <span style={{marginRight: '20px'}}></span>
              <button onClick = {() => {this.addDish(d.name)}} class="btn btn-primary">Add</button> 
            </li>))

        var reviewItems = reviews.map(r => (
            <li key={r._id}>
            {r.content} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            {r.date} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            </li>))

        var orderItems = order.map(r => (
            <li key={r._id}>
            {r.content} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            {r.status} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            {r.date} <span style={{fontWeight: 'bold', marginRight: '20px'}}></span>
            <button onClick = {() => {this.updateOrder(r.name)}} class="btn btn-primary">Update</button> 
            </li>))

        var id = this.props.match.params.id;


        let restaurantId = localStorage.getItem("restaurant_id")
        let userId = localStorage.getItem("restaurant_id")
        let editDish = null;
        if (restaurantId !== null) {
            editDish = 
            <h3>
            <a class="nav-item nav-link">
                <Link to={"/restaurant/edit"} style={{color:'blue'}}>Edit Profile</Link>
            </a>
            </h3>
        }
       

        return(
            <div>
                <div style={{marginLeft: '110px', marginTop: '10px'}}>

                    <h3>Username : {username}</h3>
                    <h3>Restaurant Name : {name}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Location : {location}</h3>
                    {editDish}

                    <br></br>
                    <h3 style={{fontWeight: "bold"}}>All Dishes: </h3>
                    <div>
                    <h3 style={{marginLeft: '30px', fontWeight: "bold"}}
                    >Name<span style={{display:'inline-block', width: '50px'}}></span> 
                    Category<span style={{display:'inline-block', width: '50px'}}></span> 
                    Price<span style={{display:'inline-block', width: '50px'}}></span> </h3>
                    </div>
                    <h3>{dishItems}</h3>
                    <button onClick = {this.placeOrder} type="submit" class="btn btn-primary">Place Order</button>

                    <br></br><br></br>
                    <h3 style={{fontWeight: "bold"}}>All Orders: </h3>
                    <h3>{orderItems}</h3>

                    <button onClick = {this.placeOrder} type="submit" class="btn btn-primary">Place Order</button>

                    <h3 style={{fontWeight: "bold"}}>All Reviews: </h3>
                    <h3>{reviewItems}</h3>
                    <div class="form-group" style={{marginTop:'30px'}}>
                        <input onChange = {this.reviewChangeHandler} type="text" class="form-control" name="review" placeholder="Add Reviews"/>
                    </div> 
                    <button onClick = {this.addReview} type="submit" class="btn btn-primary">Add</button>

                    
                </div>  
             
            </div> 


        )
    }   
}


export default compose(
    withApollo,
    graphql(getRestaurantQuery, { name: "getRestaurantQuery" }),
    graphql(addOrderMutation, { name: "addOrderMutation" }),

)(RestaurantProfile);