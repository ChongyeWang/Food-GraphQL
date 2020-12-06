import React, {Component} from 'react';
import logo from '../public/home.jpg';
import './css/Home.css';
import {Link} from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div>
                <div >
                  <img class="logo" src={logo} alt="Logo" style={{width:'100%'}}/>    
                  <div class="centered"><a><Link to="/users/login" style={{color:'black'}}>Login as a customer</Link></a></div>
                  <div class="second"><a><Link to="/restaurant/login" style={{color:'black'}}>Login as restaurant</Link></a></div>
                  <div class="third"><a><Link to="/restaurants" style={{color:'black'}}>View all restaurants</Link></a></div>
                  <div class="fifth"><a><Link to="/users/all" style={{color:'black'}}>View all users</Link></a></div>
                </div>
            </div> 
        )
    }
}
//export Home Component
export default Home;