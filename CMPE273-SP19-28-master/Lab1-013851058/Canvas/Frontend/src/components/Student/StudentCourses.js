import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class studentCourses extends Component {
  // initially data is empty in state
  state = { data: [] };

  componentDidMount() {
    // when component mounted, start a GET request
    // to specified URL

    
    axios.get('http://localhost:9000/courses')
                .then((response) => {
                //update the state with the response data
                this.setState({
                  data : response.data
                })
                    
                });
            
  
  }


  render() {
    var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    return (
      <div>
        <h3> Course List </h3>
        <table border="1" align = "center">
    <tr>
       <th>Course ID</th><th>Course Name</th><th></th> <th></th>
    </tr>
    {
    this.state.data.map(function(course){
       return <tr>
        <td>{course.CourseId}</td>
        <td>{course.CourseName}</td>
      
        <td><button class="btn btn-submit" name= "Enroll" type="submit">Enroll</button></td>
        <td><button class="btn btn-danger" name= "Enroll" type="submit">Delete</button></td>
      </tr>    
      }) }
     
 </table>
   
      </div>
    );
  }
}