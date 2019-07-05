import React, {Component} from 'react';

import Button from 'react-bootstrap/Button';
import styles from '../Faculty/faculty.css'; 

import {Redirect} from 'react-router';
import {submitAssignments} from '../../actions/AssignmentActions';
import { connect } from "react-redux";

class submitAssignment extends Component {

    constructor(props){
        super(props);
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            announcements : '',
            courseId : localStorage.getItem('course'),
            Name : '',
            id : this.props.match.params.id
        }    
    }  

    
    componentDidMount(){
     
    }

    handleChange = event => {
        this.setState({
            announcements : event.target.value
        });
      }

    handleNameChange = event => {
        console.log("Name", event.target.value)
        this.setState({
            Name : event.target.value
        });
      }


      handleselectedFile(e) {
        let files = e.target.files;
        let reader = new FileReader();
        this.setState(
            {file : files[0]}
        )
        console.log(files[0]);
       
       }

    createAnnouncement = event =>
    {
        event.preventDefault();
        var data = {
         
           
   AssignmentId :this.state.id,
   
   
        name : this.state.name,
        CourseId : this.state.courseId,
        Content : this.state.announcements,
        Name : this.state.Name
           
        }
        console.log(data);
        this.props.submitAssignments(data, (res) => {
          this.props.history.push('/home/student/Courses/assignments');
        })
    
    }

render()
{ 
  var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    return (
        <div className = "add">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Submit Assignment</label>
    <input type="file" name="" id="" style = {{ marginLeft : 300}} onChange={(e)=>this.handleselectedFile(e)} />
    <input type="text" class="form-control"   value={this.state.Name}
              onChange={this.handleNameChange} aria-describedby="emailHelp" placeholder="Add Submission Name"/>
    <input type="text" class="form-control"   value={this.state.announcements}
              onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Add Submission"/>
  </div>
  <button type="submit" class="btn btn-primary" onClick = {this.createAnnouncement}>Submit</button>
</form>
</div>


    )
    
  }
} 

export default (connect(null, { submitAssignments})(submitAssignment));