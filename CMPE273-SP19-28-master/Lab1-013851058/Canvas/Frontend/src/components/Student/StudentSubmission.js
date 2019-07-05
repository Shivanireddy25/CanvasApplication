import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class announcements extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            submissions : [],
            assignmentId : 1
        }
    }  

    
   
    componentDidMount(){
       axios.post('http://localhost:9000/submissions',  { assignmentId: this.state.assignmentId, name : this.state.name}) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    submissions  : response.data
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
    let submissions = this.state.submissions.map(course => {
        return(
            <div class="container">
            <div class="alert alert-dark" role="alert">
            {course.Content}
          </div>
            </div>

        )
    })
    return (
        <div>
            {announcements}
        </div>
    )
    
  }
} 
