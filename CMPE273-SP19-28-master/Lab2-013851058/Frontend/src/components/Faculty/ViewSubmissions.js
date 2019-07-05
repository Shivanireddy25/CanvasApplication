import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import {getAllSubmissions} from '../../actions/AssignmentActions';
import { connect } from "react-redux";



class ViewSubmission extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            people : [],
            courseId : localStorage.getItem('course'),
            Score : '',
            Outof : ''

        }
    }  

    
    handleScore = event => {
      this.setState({
        Score : event.target.value
      });
    }
    handleOutOf = event => {
      this.setState({
        Outof : event.target.value
      });
    }

    handleGrade = event => {
     var data = {
     // grade:String,
      SubmissionId :String,
      name : String,
      Score : String,
      Outof : this.state.Outof,
      CourseId:this.state.courseId
     }


    }

    componentDidMount(){
      console.log(this.state.courseId);
      
      this.props.getAllSubmissions(this.state.courseId, (response) => {
        console.log(response.data);
    //update the state with the response data
    this.setState({
        people  : response.data
    });
})
    }

render()
{ 
  var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
   
   let people = this.state.people.map(course => {
        return(
<tr>
      <td> {course.User}</td>
      <td>  {course.Name}</td>
      <td>{course.Content}</td>
      <td><Link to={`/home/faculty/Courses/grades/${course.User}/${course.Name}`} class="card-link" >Grade </Link> </td>
     
      
    
    </tr>
   
          

        )
    })
    return (
        <table class="table" style = {{marginLeft : 300}}>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Course</th>
      <th scope="col">Content</th>
      <th scope="col">Action </th>
      <th scope="col">Grade</th>
     
      
    </tr>
  </thead>
  <tbody>
    {people}
  </tbody>
</table>
        
    ) 
    
  }
}

export default (connect(null, {getAllSubmissions})(ViewSubmission));