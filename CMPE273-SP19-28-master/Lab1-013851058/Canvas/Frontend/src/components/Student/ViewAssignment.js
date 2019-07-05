import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../components/style/announcements.css';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class ViewAssignment extends Component {

    constructor(props){
        super(props);
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            assignments : [],
            submissions : [],
            id : this.props.match.params.id,
            courseId : localStorage.getItem('course')
        }
    }  

    
   
    componentDidMount(){
       
        axios.get(`http://localhost:9000/assignments/${this.state.id}`)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    assignments  : response.data
                });
            }); 
    }


    getSubmissions = event => {
        console.log("Submission")
        event.preventDefault();
        axios.get(`http://localhost:9000/submissions/${this.state.id}`)
        .then((response) => {
        //update the state with the response data
        this.setState({
            submissions  : response.data
        });
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
    let submissions = this.state.submissions.map(course => {
        return  <ul class="nav-item" style = {{marginLeft : 400}}>
        <a class="nav-link active" href="#">{course.content}</a>
      </ul>
        
     
   })
    let assignments = this.state.assignments.map(course => {
        return(
            <form>
            <div class="new" id = "DetailBar">
           <h3>Lab {this.state.id} : </h3> 
          
           <button type="file" class="btn btn-primary" style = {{marginLeft : 600}}>Submit Assignment</button>
            <div class="alert alert-dark" role="alert">
            {course.Content}
          </div>
          <button onClick={this.getSubmissions}> View Submissions </button>
         
          </div>
          </form>
        

        )
    })
    return (
        <div class="announcements">
            {assignments}
           {submissions}
        </div>
    )
    
  }
} 
