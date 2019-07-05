import React, {Component} from 'react';
import styles from '../Student/Student.css'; 

import {Redirect} from 'react-router';
import {getGrade} from '../../actions/GradeActions';
import { connect } from "react-redux";



 class StudentGrade extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            grades : [],
            courseId : localStorage.getItem('course')
        }
    }  

    
   
    componentDidMount(){
        var data = {
            courseId: this.state.courseId,
            name : this.state.name
        }

        this.props.getGrade(data, (response) => {
          console.log(response.data);
           this.setState({
               grades  : response.data
           });
           console.log(this.state.grades);
       } );
     
    }

render()
{ 
  var redirectVar = null;
  if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
  }  


let people = this.state.grades.map(course => {
    return(
<tr>
  <td> {course.name}</td>
  <td>  {course.SubmissionId}</td>
  <td>  {course.Score}</td>
  <td>{course.Outof}</td>
  
   

</tr>

      

    )
})

    return (
        <div>
            <h2 style = {{marginLeft : 300}}> Grades for {this.state.name}</h2> 
            <button style = {{marginLeft : 1200}} >Print Grades </button>
           
        <table class="table" style = {{marginLeft : 300}}>
  <thead>
    <tr>
      <th id = "header"scope="col">Name</th>
      <th  id = "header"scope="col">Submission</th>
      <th  id = "header"scope="col">Score</th>
    <th  id = "header"scope="col">Out of</th>
     
     
    </tr>
  </thead>
  <tbody>
    {people}
  </tbody>
</table>
</div>
        
    )
    
  }
} 

export default (connect(null, { getGrade})(StudentGrade));