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
import Search from './Search';
import { Link } from 'react-router-dom';

var randomColor = require('randomcolor');




export default class HomeCourses extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courses : [],
            search :''
        }
        this.searchCourses = this.searchCourses.bind(this);
    }  

    
   
    componentDidMount(){
        var data = {
            name : this.state.name,
             userType : this.state.userType
            }
       axios.post('http://localhost:9000/courses', data ) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    courses : response.data
                });
            }); 
    }

    searchCourses = event => {
        this.props.history.push("/home/searchCourse");
    }

   
    render(){
        //if not logged in go to login page
       
        var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
        const isFaculty = (this.state.userType === 'faculty') ? true : false;
    
        if(!cookie.load('cookie')){
            console.log("Still in home");
            redirectVar = <Redirect to= "/" />
            return redirectVar;
        } else {
            var p;
            if (this.state.userType === 'faculty') {
              p = "proffessor";
            }
           
            let courses = this.state.courses.map(course => {
                return(
                    
                    
                          
                          <div class="card" style = {{width :302}}>
   <div class="card-body" style = {{backgroundColor : randomColor(), height : 130}}>
   
   
   
  </div>
  <h6 class="card-subtitle mb-2 text-muted">{course.CourseName}</h6>
    <p class="card-text">{course.CourseDescription}</p>
  
    {!isFaculty ? 
    <div> 
    <Link to={`/home/enrollCourse/${course.CourseId}`} class="card-link" >Enroll </Link>
    <Link to={`/home/deleteCourse/${course.CourseId}`} class="card-link" >Delete </Link> 
    </div> : ''}
   
  
  </div>


                    
  
                )
            })
                return (

                    
                   <div>
                         {isFaculty ? <a href="/home/AddCourse" class="btn btn-info" style = {{marginLeft : 200}}role="button">Create Course</a> : ''} 
                  {!isFaculty ? <div class="form-group has-search">
                  
                    <span class="fa fa-search form-control-feedback" onChange = {this.searchCourses} ></span>
                    <input type="text" class="form-control"  value = {this.state.search}  onChange = {this.searchCourses} placeholder="Search"/>
                  </div> : ''}
                   
                   <div>
                    <div className = "col-sm-11" id = "courseSection" >  
                 
                      {courses}
                    
                    </div>
                    </div>
                    </div>
                    
                );
            
        }
    }
}

/*
 */