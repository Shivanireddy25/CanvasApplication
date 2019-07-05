import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../../components/style/announcements.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class Facassignments extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            assignments : [],
            courseId : 1
        }
    }  

    
   
    componentDidMount(){
       axios.post('http://localhost:9000/assignments',  { courseId: this.state.courseId}) 
                .then((response) => {
                //update the state with the response data
                this.setState({
                    assignments  : response.data
                });
            }); 
    }

  createAssignment = event =>
    {
        this.props.history.push('/home/faculty/Courses/addAssignment');

    }

render()
{ 
    var redirectVar = null;
    if(!cookie.load('cookie')){
      console.log("Still in home");
      redirectVar = <Redirect to= "/" />
      return redirectVar;
  } 
    let assignments = this.state.assignments.map(course => {
        return(
            <div class="new" id = "DetailBar">
            <div class="alert alert-dark" role="alert">
         <div className="quiztab" ><Link to={`/home/student/Courses/assignments/${course.ID}`}> Assignment {course.ID}</Link></div>
         <p> Lab{course.ID}.docx</p>  
            <div>
            Due Date : 10th March
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
