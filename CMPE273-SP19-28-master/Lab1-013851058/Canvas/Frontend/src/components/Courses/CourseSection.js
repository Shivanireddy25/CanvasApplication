import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class CourseSection extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courses : [],
            value : ''
        }
    }  

    courseClicked = event => {
        event.preventDefault();
     
      console.log(event.target.value);
      
      localStorage.setItem('course', event.target.value);
      if(this.state.userType === 'faculty'){
        this.props.history.push('/home/faculty/Courses');
      } else {
      this.props.history.push('/home/student/Courses');
      }
      
      }
    
   
    componentDidMount(){
       axios.post('http://localhost:9000/coursesList',  { name : this.state.name , userType : this.state.userType}) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    courses  : response.data
                });
            }); 
    }

render()
{ 
  var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    const isFaculty = (this.state.userType === 'faculty') ? true : false;
    let courses = this.state.courses.map(course => {
        return( <div>
<div class="list-group">
  
  <button type="button" id ="courseButton" value={course.CourseId} class="list-group-item list-group-item-action" onClick = {this.courseClicked}> {course.CourseName}</button>

 
</div>

           
  </div>
           
        )
    })
    return (
  
        <div className = "courseList" style={{marginLeft: '100px', width: "100px"}}>
            {courses} 
        </div>
    )
    
  }
}



