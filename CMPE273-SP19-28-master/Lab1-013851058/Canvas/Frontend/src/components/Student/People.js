import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import CourseSection from '../Courses/CourseSection';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class people extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            people : [],
            courseId : localStorage.getItem('course')
        }
    }  

    
   
    componentDidMount(){
       axios.post('http://localhost:9000/people',  { courseId: this.state.courseId}) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    people  : response.data
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
   
    let people = this.state.people.map(course => {
        return(
<tr>
      <td> {course.name}</td>
      <td>  {course.CourseName}</td>
      <td>{course.createdBy}</td>
      <td>{course.status}</td>
    </tr>
   
          

        )
    })
    return (
        <table class="table" style = {{marginLeft : 300}}>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Course</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      
    </tr>
  </thead>
  <tbody>
    {people}
  </tbody>
</table>
        
    )
    
  }
} 

