import React, {Component} from 'react';
import {Redirect} from 'react-router';

//Add link to course components
export default class CourseHome extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            people : [],
            courseId : localStorage.getItem('course'),
        }
    }  

render()
{ 
  var redirectVar = null;
 
  if(!localStorage.getItem('token')){
    redirectVar = <Redirect to="/" />
    return redirectVar;        
   }  
  return (
  <div class="jumbotron" style = {{marginLeft : 300, width : 1064}}>
  <h3 class="display-4"> Welcome {this.state.userType}, {this.state.name}!</h3>
  <p class="lead"> The Enterprise Software Technologies Program prepares outstanding men and women from around the world to be technical leaders in the rapidly changing software development environment. It offers an unsurpassed education in the fundamentals of software development and in-depth exposure to the latest technologies and trends shaking the foundation of Enterprise software development.</p>
  <hr class="my-4"/>
  <p class="lead">
   <a class="btn btn-primary btn-lg" href="#" role="button"> Check Course Details</a>
  </p>
  </div>

  )
  }
} 


