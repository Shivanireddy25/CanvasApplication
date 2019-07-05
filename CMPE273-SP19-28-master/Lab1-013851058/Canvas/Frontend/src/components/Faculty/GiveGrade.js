import React, {Component} from 'react';
import styles from '../Student/Student.css'; 
import axios from 'axios';
import CourseSection from '../Courses/CourseSection';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class GiveGrade extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            grades : [],
            courseId : localStorage.getItem('course')
        }
    }  

    
   
    componentDidMount(){
        var data = {
            courseId: this.state.courseId,
            name : this.state.name
        }
       axios.post('http://localhost:9000/giveGrades',  data) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    grades  : response.data
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
    let people = this.state.grades.map(course => {
        return(
    <tr>
      <td id = "header"> {course.user}</td>
      <td id = "header"> {course.Name}</td>
      {course.Score === null ?
     <td id = "header">  <button> Give Grade </button> </td>  : "Graded"}
      <td id = "header">   {course.Score}</td>
      
     
    
     
     
    </tr>
   
          

        )
    })
    return (
        <div>
            <h2 style = {{marginLeft : 300}}> Grades </h2> 
          
           
        <table class="table" style = {{marginLeft : 300}}>
  <thead>
    <tr>
      <th id = "header"scope="col">Student</th>
      <th id = "header"scope="col">Lab Details</th>
      <th  id = "header"scope="col"> Grade Entry</th>
      <th  id = "header"scope="col">Score</th>
      
   
    
    </tr>
  </thead>
  <tbody>
    {people}
  </tbody>
</table>
</div>
        
    )
    
  }
} 

