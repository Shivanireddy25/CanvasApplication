import React, {Component} from 'react';

import styles from './faculty.css'; 

import {Redirect} from 'react-router';
import { connect } from "react-redux";
import {addAssignment} from '../../actions/AssignmentActions';


 class addAssignments extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            announcements : '',
            courseId : localStorage.getItem('course'),
            Name : ''
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
        this.setState({
            Name : event.target.value
        });
      }

    createAnnouncement = event =>
    {
        event.preventDefault();
        
        var data = {
        name : this.state.name,
        CourseId : this.state.courseId,
        Content : this.state.announcements,
        Name : this.state.Name  
        }
        console.log(data);
         this.props.addAssignment(data, (res) => {this.props.history.push('/home/faculty/Courses/assignments');});      

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
    <label for="exampleInputEmail1">Assignment</label>
    <input type="file" name="" id="" style = {{ marginLeft : 300}} onChange={(e)=>this.handleselectedFile(e)} />
    <input type="text" class="form-control"   value={this.state.Name}
              onChange={this.handleNameChange} aria-describedby="emailHelp" placeholder="Add Assignment Name"/>
    <input type="text" class="form-control"   value={this.state.announcements}
              onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Add Assignment"/>
   
  </div>
 
  <button type="submit" class="btn btn-primary" onClick = {this.createAnnouncement}>Submit</button>
</form>
</div>


    )
    
  }
} 

export default (connect(null, { addAssignment})(addAssignments));