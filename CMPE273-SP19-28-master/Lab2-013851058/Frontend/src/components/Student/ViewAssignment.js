import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../components/style/announcements.css';
import {Redirect} from 'react-router';
import {getAssignment, getSubmissionForAssign} from '../../actions/AssignmentActions';
import { connect } from "react-redux";


 class ViewAssignment extends Component {

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
       
        this.props.getAssignment(this.state.id, (response) => {
            //update the state with the response data
            this.setState({
                assignments  : response.data
            });
        } )
    }


    getSubmissions = event => {
        event.preventDefault();
        this.props.getSubmissionForAssign(this.state.id, (response) => {
            //update the state with the response data
            this.setState({
                submissions  : response.data
            });
        })

       /* console.log("Submissions List");
        console.log(event.target.value);
        event.preventDefault();
        axios.get( ROOT_URL + `/submissions/${this.state.id}`, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
        .then((response) => {
        //update the state with the response data
        this.setState({
            submissions  : response.data
        });
    }); */
    }



render()
{ 
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    let submissions = this.state.submissions.map(course => {
        return  <ul class="nav-item" style = {{marginLeft : 400}}>
         <Button className="quiztab" ><Link to={`/home/student/Courses/submission/${course._id}`}> {course.Name} </Link></Button> 
      </ul>
        
     
   })
   
    return (
        <div class="announcements">
        <form>
            <div class="new" id = "DetailBar">
           <h3>Lab  : </h3> 
           <Button className="quiztab" style = {{marginLeft : 600}} ><Link to={`/home/student/Courses/submissions/${this.state.assignments._id}`}> Submit Assignment </Link></Button> 
            <div class="alert alert-dark" role="alert">
            {this.state.assignments.Content}
          </div>
          <button onClick={this.getSubmissions}> View Submissions </button>
         
          </div>
          </form>
            
           {submissions} 
        </div>
    )
    
  }
} 

export default (connect(null, { getAssignment, getSubmissionForAssign})(ViewAssignment));