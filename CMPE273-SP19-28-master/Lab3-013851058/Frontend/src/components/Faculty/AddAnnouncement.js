import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {addAnnouncement} from '../../actions/AnnouncementActions';
import { connect } from "react-redux";

class addAnnouncements extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            announcements : '',
            courseId : localStorage.getItem('course'),
            token : localStorage.getItem('token')
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
        courseId : this.state.courseId,
        announcements : this.state.announcements
           
        }
        console.log(data);
        this.props.addAnnouncement(data, (res) => { this.props.history.push('/home/faculty/Courses/announcements');});
    
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
    <label for="exampleInputEmail1">Announcement</label>
    <input type="text" class="form-control"   value={this.state.announcements}
              onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Add Announcement"/>

  </div>
 
  <button type="submit" class="btn btn-primary" onClick = {this.createAnnouncement}>Submit</button>
</form>
</div>


    )
    
  }
} 

export default (connect(null, { addAnnouncement })(addAnnouncements));
