import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import Button from 'react-bootstrap/Button';
import '../../components/style/announcements.css';
import {Redirect} from 'react-router';
import {getAnnouncements} from '../../actions/AnnouncementActions';
import { connect } from "react-redux";


 class Facannouncements extends Component {

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

        this.props.getAnnouncements ({ courseId: this.state.courseId}, (response) => {this.setState({
            announcements  : response.data
        });})
    }

    createAnnouncement = event =>
    {
        this.props.history.push('/home/faculty/Courses/addAnnouncements');

    }

render()
{ 
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    let announcements = this.state.announcements.map(course => {
        return(
            <div class="new" id = "DetailBar">
              <div class="alert alert-dark" role="alert">

              {course.announcement}
            </div>
              </div> 
  

        )
    })
    return (
        <div class= "announcements">
         <h2 style = {{
                marginLeft : 400
            }}> Announcements </h2>
            <Button align = "right" style = {{
                marginLeft : 1000
            }}onClick= {this.createAnnouncement}> Create announcements </Button>
            {announcements}
        </div>
    )
    
  }
} 

export default (connect(null, { getAnnouncements })(Facannouncements));