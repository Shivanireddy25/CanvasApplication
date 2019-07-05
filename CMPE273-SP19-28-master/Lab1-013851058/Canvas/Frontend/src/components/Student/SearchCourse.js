import React, { Component } from 'react';

import styles from './Student.css';
import axios from 'axios';
import { CourseBox } from './CourseBox';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

var randomColor = require('randomcolor');
export default class SearchCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchterm: "",
            courses: [],
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courseId : localStorage.getItem('course'),

        }
        this.serachtermHandler = this.serachtermHandler.bind(this);
    }

    serachtermHandler = (e) => {
        this.setState({
            searchterm: e.target.value
        })
    }

    componentDidMount(){
      var data = {
        name : this.state.name,
         userType : this.state.userType
        }
   axios.get('http://localhost:9000/coursesOnly', data ) 
            .then((response) => {
            //update the state with the response data
            this.setState({
                courses : response.data
            });
        });  
    }

  render() {
    const isFaculty = (this.state.userType === 'faculty') ? true : false;
    var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    let courses = [];
    Object.assign(courses, this.state.courses);
    let courseAll = this.state.courses.map(course => {
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
       
        <div className="pageContent">
          <div className="row coursesearch">
            <input type="text" name="searchterm" className="searchinput" placeholder="Search course by id or name" onChange={this.serachtermHandler}/>
            <br></br>
            {courseAll}
   
          </div>
        </div>
      </div>
    )
  }
}


