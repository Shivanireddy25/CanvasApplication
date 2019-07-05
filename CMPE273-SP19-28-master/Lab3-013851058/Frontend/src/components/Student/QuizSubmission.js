import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import {Redirect} from 'react-router';

//Add link to course components
export default class QuizSubmission extends Component {


render()
{ 
  var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
  return (
   <div >
  <h2 style ={{marginLeft : 300}}> Quiz Submitted </h2>
  </div>
  
    )
  }
} 


