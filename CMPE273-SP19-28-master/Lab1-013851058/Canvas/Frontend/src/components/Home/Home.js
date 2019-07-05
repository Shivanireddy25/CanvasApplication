import React, {Component} from 'react';
import '../../App.css';
//import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { NavLink } from 'react-router-dom'
import { SideNav, Nav } from 'react-sidenav';
import styles from '../Home/Home.css'; 
import logo from '../../images/sjsuIcon.png';
import login from '../Login/LoginPage';
import signUp from '../../components/signUp/signUp';
import courses from '../Courses/Courses';
import axios from 'axios';
import Courses from '../Courses/Courses';
import Popup from 'react-popup';



export default class Home extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courses : []
        }
    }  

    
   
    componentDidMount(){
       
    }
    signOut = event => {
        localStorage.removeItem('name');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        localStorage.removeItem('course');
        this.props.history.push('/');

      }

    signOut 

    render(){
        //if not logged in go to login page
        var redirectVar = null;
    
        if(!cookie.load('cookie')){
            console.log("Still in home");
            redirectVar = <Redirect to= "/" />
            return redirectVar;
        } else {
            let courses = this.state.courses.map(course => {
                return(
                    <div class="card" >
   <div class="card-body" >
    <h5 class="card-title">{course.CourseId}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{course.CourseName}</h6>
    <p class="card-text">{course.CourseDescription}</p>
    <a href="#" class="card-link">Enroll</a>
    <a href="#" class="card-link">Delete</a>
  </div>
  </div>
                )
            })
                return (
                   
                  
                    <div className = "container">
                    <div className = "row">
                    <div className = "col-sm-3" id = "icon"> 
                    </div>
                    <div className = "col-sm-7" align ="center"> 
                    <div class="alert alert-dark" role="alert">
                    <h2> Dashboard </h2>   
                    </div>
                    
                    
                    </div>
                    <div className = "col-sm-2" align ="center"> 
                    <button type="button" class="btn btn-danger" align = "right" onClick={this.signOut}>SignOut</button>
                    </div>
                    </div>
                    
                    <div className = "col-sm-1"> 
                    <div className = "row" id = "menu-item">
                    <NavLink to="/home/profile" activeClassName="active">Profile</NavLink>
                    <img src = "https://sjsu.instructure.com/images/messages/avatar-50.png" style = {{ marginRight : 30, width : 100}}/>  
                    <div>
                   
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                   
                    <div>
                    <NavLink  to="/home/courses" activeClassName="active">Home</NavLink>
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                   
                    <div>
                    <NavLink to="/home/CourseSection" activeClassName="active">Courses</NavLink>
                    </div>
                    </div>
                    
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/" activeClassName="active">Help</NavLink>
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/" activeClassName="active">People</NavLink>
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/" activeClassName="active">Inbox</NavLink>
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/" activeClassName="active">Library</NavLink>
                    </div>
                    
                    </div>
                    </div>   
                    </div>
                    
                );
            
        }
    }
}
