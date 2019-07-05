import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


//Add link to course components
export default class Courses extends Component {
  constructor() {
    super();
    this.state = {
       
       active : false,
    }
    
   
}

  

render()
{ 
  
  return (
    <div className = "container">
    <div class="nav flex-column nav-pills"  style = {{top : 100}} id="v-pills-tab" role="tablist" aria-orientation="vertical">


    <a class="nav-link " style = {{display : "inline"}}  id="v-pills-home-tab" data-toggle="pill" href="/home/student/Courses/home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a> 
    <a class="nav-link " style = {{display : "inline"}} id="v-pills-profile-tab" data-toggle="pill" href="/home/student/Courses/announcements" role="tab" aria-controls="v-pills-profile" aria-selected="false">Announcements</a>
    <a class="nav-link "  style = {{display : "inline"}}id="v-pills-messages-tab" data-toggle="pill" href="/home/student/Courses/assignments" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assignments</a>
    <a class="nav-link "  style = {{display : "inline"}} id="v-pills-settings-tab" data-toggle="pill" href="/home/student/Courses/grades" role="tab" aria-controls="v-pills-settings" aria-selected="false">Grades</a>
    <a class="nav-link " style = {{display : "inline"}} id="v-pills-settings-tab" data-toggle="pill" href="/home/student/Courses/people" role="tab" aria-controls="v-pills-settings" aria-selected="false">People</a>
    <a class="nav-link "  style = {{display : "inline"}}id="v-pills-settings-tab" data-toggle="pill" href="/home/student/Courses/quizs" role="tab" aria-controls="v-pills-settings" aria-selected="false">Quizzes</a>
    <a class="nav-link active"  style = {{display : "inline"}}id="v-pills-settings-tab" data-toggle="pill" href="/home/student/Courses/files" role="tab" aria-controls="v-pills-settings" aria-selected="false">Files</a>


  </div>
  </div>
  
  
    )
  }
} 


