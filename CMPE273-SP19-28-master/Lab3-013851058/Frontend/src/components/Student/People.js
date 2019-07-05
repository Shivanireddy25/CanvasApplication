import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import {Redirect} from 'react-router';
import {ROOT_URL} from '../../URLSettings';


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
      console.log(this.state.courseId);
       axios.post( ROOT_URL + '/people',  { courseId: this.state.courseId}, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    }) 
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
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
   
    let people = this.state.people.map(course => {
        return(
<tr>
      <td> {course.name}</td>
    
      <td>{course.createdBy}</td>
      <td>{course.Status}</td>
      <td>  {course.CourseName}</td>
    </tr>
   
          

        )
    })
    return (
        <table class="table" style = {{marginLeft : 300}}>
  <thead>
    <tr>
      <th scope="col">Name</th>
    
      <th scope="col">Role</th>
      <th scope="col">Status</th>
      <th scope="col">Course</th>
      
    </tr>
  </thead>
  <tbody>
    {people}
  </tbody>
</table>
        
    )
    
  }
} 

