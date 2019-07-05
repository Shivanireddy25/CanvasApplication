import React, {Component} from 'react';
import styles from '../Courses/course.css'; 

import Button from 'react-bootstrap/Button';
import '../../components/style/announcements.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {getAssignments} from '../../actions/AssignmentActions';
import { connect } from "react-redux";


class Facassignments extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            assignments : [],
            courseId : localStorage.getItem('course')
        }
    }  

    
   
    componentDidMount(){

        this.props.getAssignments({ courseId: this.state.courseId}, (response) => {
            console.log(response.data);
            //update the state with the response data
            this.setState({
                assignments  : response.data
            });
        })
    }

  createAssignment = event =>
    {
        this.props.history.push('/home/faculty/Courses/addAssignment');

    }

render()
{ 
    
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    let assignments = this.state.assignments.map(course => {
        return(
            <div class="new" id = "DetailBar">
            <div class="alert alert-dark" role="alert">
         <div className="quiztab" ><Link to={`/home/student/Courses/assignments/${course._id}`}> Assignment {course.ID}</Link></div>
         <p> Lab{course.name}.docx</p>  
            <div>
            Due Date : 14th April
            </div>
        
          </div>
          </div>
         

        )
    })
    return (
        
        <div class="announcements" style = {{display : "inline"}}>
        <table>
        <h2 style = {{
                marginLeft : 400
            }}> Assignment </h2>
            <Button align = "right" style = {{
                marginLeft : 1050
            }}onClick= {this.createAssignment}> Create assignments </Button>
            {assignments}
            </table>
        </div>
        
    )
    
  }
} 

export default (connect(null, { getAssignments})(Facassignments));
