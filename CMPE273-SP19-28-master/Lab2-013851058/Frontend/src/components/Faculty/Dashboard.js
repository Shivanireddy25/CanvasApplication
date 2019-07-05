import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import styles from '../Home/Home.css'; 
import {getUserCourses} from '../../actions/CourseAction';
var randomColor = require('randomcolor');


 class Dashboard extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courses : [],
            search :''
        }
    
    }  

    
   
    componentDidMount(){
        var data = {
            name : this.state.name,
            userType : this.state.userType
            }
  this.props.getUserCourses(data,(response) => {
    //update the state with the response data
    this.setState({
        courses : response.data
    });
} )
    
    }

   

    searchCourses = event => {
        console.log(event.target.value);
        this.props.history.push("/home/searchCourse");
    }

   
    render(){
        //if not logged in go to login page
       
        var redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to="/" />
            return redirectVar;        
        }  
        const isFaculty = (this.state.userType === 'faculty') ? true : false;
    
      
            
           
            let courses = this.state.courses.map(course => {
                return(
                    
                    <div style = {{marginLeft : 200}}>
                    <Draggable>                         
 <div class="card" style = {{width :302}}>
 
   <div class="card-body" style = {{backgroundColor : randomColor(), height : 130}}>
  </div>
  <h6 class="card-subtitle mb-2 text-muted">{course.CourseId}</h6>
    <p class="card-text">{course.CourseName}</p>
  
    {!isFaculty ? 
    <div> 
   {course.CourseCapacity !== ''  ? <Link to={`/home/enrollCourse/${course.CourseId}`} class="card-link" >Enroll </Link>
: <Link to={`/home/waitListCourse/${course.CourseId}`} class="card-link" >Enroll </Link> }
    <Link to={`/home/deleteCourse/${course.CourseId}`} class="card-link" >Delete </Link> 
    </div> : ''}
    
   
    
  </div>
  </Draggable>
  </div>
                )
            })
                return (

                    
                    <div>
                   
                   <div>
                    <div className = "CourseCards"  id = "courseSection" >  
                 
                      {courses}
                    
                    </div>
                    </div>
                    </div>
                    
                );
            
      
    }
}

export default (connect(null, {getUserCourses})(Dashboard));
 