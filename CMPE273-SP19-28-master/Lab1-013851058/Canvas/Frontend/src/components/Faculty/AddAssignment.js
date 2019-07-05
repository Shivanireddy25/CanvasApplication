import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import styles from './faculty.css'; 
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

export default class addAssignments extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            announcements : '',
            courseId : localStorage.getItem('course')
        }
        
    }  

    
   
    componentDidMount(){
     
    }

    handleChange = event => {
        this.setState({
            announcements : event.target.value
        });
      }

    createAnnouncement = event =>
    {
        event.preventDefault();
        var data = {
         
        name : this.state.name,
        CourseId : this.state.courseId,
        Content : this.state.announcements
           
        }
        console.log(data);
    
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:9000/createAssignments', data)
        .then(res => {
          this.props.history.push('/home/faculty/Courses/assignments');
        });
      

    }

render()
{ 
  var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    return (
        <div className = "add">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Assignment</label>
    <input type="file" name="" id="" style = {{ marginLeft : 300}} onChange={(e)=>this.handleselectedFile(e)} />
    <input type="text" class="form-control"   value={this.state.announcements}
              onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Add Assignment"/>
   
  </div>
 
  <button type="submit" class="btn btn-primary" onClick = {this.createAnnouncement}>Submit</button>
</form>
</div>


    )
    
  }
} 
