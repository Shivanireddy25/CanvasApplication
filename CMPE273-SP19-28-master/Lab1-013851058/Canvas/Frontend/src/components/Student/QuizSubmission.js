import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Add link to course components
export default class QuizSubmission extends Component {


render()
{ 
  var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
  return (

   <div >
  <h2 style ={{marginLeft : 300}}> Quiz Submitted </h2>
  <p style ={{marginLeft : 300}}> Score 1 outOf 2 </p>
  </div>
  
  
    )
  }
} 


