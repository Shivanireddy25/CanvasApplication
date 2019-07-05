import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../components/style/announcements.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class announcements extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            announcements : [],
            courseId : localStorage.getItem('course'),
            contents : ''
        }
    }  

    
   
    componentDidMount(){
       axios.post('http://localhost:9000/announcements',  { courseId: this.state.courseId}) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    announcements  : response.data
                });
            }); 
    }

    createAnnouncement = event =>
    {
        this.props.history.push('/signUp');
    }

     render()
    { 
        var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    let announcements = this.state.announcements.map(course => {
        return(

        <div class="new" id = "DetailBar">
          Announcement {course.ID}:
            <div class="alert alert-dark" role="alert">
          
            {course.announcements}
          </div>
            </div> 

        )
    })
    return (
       
        
<div class= "announcements" >

         {announcements}
   </div>
       
        
    )
    
  }
} 

