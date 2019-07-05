import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Add link to course components
export default class FacultyCourses extends Component {


render()
{ 
  var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
  return (
    <div class = "container">
    <div class="nav flex-column nav-pills"  style = {{top : 100}} id="v-pills-tab" role="tablist" aria-orientation="vertical"  >
    <a class="nav-link " id="v-pills-home-tab" data-toggle="pill" href="  /home/faculty/Courses/home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
    <a class="nav-link  " id="v-pills-profile-tab" data-toggle="pill" href="/home/faculty/Courses/announcements" role="tab" aria-controls="v-pills-profile" aria-selected="false">Announcements</a>
    <a class="nav-link " id="v-pills-messages-tab" data-toggle="pill" href="/home/faculty/Courses/assignments" role="tab" aria-controls="v-pills-messages" aria-selected="false">Assignments</a>
    <a class="nav-link " id="v-pills-settings-tab" data-toggle="pill" href="/home/faculty/Courses/grades" role="tab" aria-controls="v-pills-settings" aria-selected="false">Grades</a>
    <a class="nav-link " id="v-pills-settings-tab" data-toggle="pill" href="/home/faculty/Courses/people" role="tab" aria-controls="v-pills-settings" aria-selected="false">People</a>
    <a class="nav-link " id="v-pills-settings-tab" data-toggle="pill" href="/home/faculty/Courses/quiz" role="tab" aria-controls="v-pills-settings" aria-selected="false">Quizzes</a>
    <a class="nav-link active" id="v-pills-settings-tab" data-toggle="pill" href="/home/faculty/Courses/files" role="tab" aria-controls="v-pills-settings" aria-selected="false">Files</a>
    <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="/home/faculty/Courses/submissions" role="tab" aria-controls="v-pills-settings" aria-selected="false">Submissions</a>
    </div>

  </div>
  
  
    )
  }
} 


