import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

var randomColor = require('randomcolor');


export class CourseBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courseId : localStorage.getItem('course'),      
        }
    }
  render() {
    var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    const isFaculty = (this.state.userType === 'faculty') ? true : false;
    return (
      
        <div class="card" style = {{width :302}}>
        <div class="card-body" style = {{backgroundColor : randomColor()}}>
        
         <h5 class="card-title">{this.props.CourseId}</h5>
         <h6 class="card-subtitle mb-2 text-muted">{this.props.CourseName}</h6>
         <p class="card-text">{this.props.CourseDescription}</p>
         {!isFaculty ? 
         <div><a href="/home/courses/enrollCourse"  class="card-link">Enroll</a>
         <a href="/home/courses/deleteCourse" class="card-link">Delete</a> 
         </div> : ''}
   
  </div>
  </div>
        
      
     

    )
  }
}

