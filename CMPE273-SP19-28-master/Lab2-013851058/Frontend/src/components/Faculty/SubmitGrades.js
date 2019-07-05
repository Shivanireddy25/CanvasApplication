import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import {Redirect} from 'react-router';
import {giveGrade} from '../../actions/GradeActions';
import { connect } from "react-redux";



class SubmitGrades extends Component {

    constructor(props){
        super(props);
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            people : [],
            courseId : localStorage.getItem('course'),
            Score : '',
            Outof : '',
            student : this.props.match.params.id,
            submissionId : this.props.match.params.id1

        }

        this.handleGrade = this.handleGrade.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleOutOf = this.handleOutOf.bind(this);
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
      SubmissionId :this.state.submissionId,
      name : this.state.student,
      Score : this.state.Score,
      Outof : this.state.Outof,
      CourseId:this.state.courseId
     }
     console.log(data);

     this.props.giveGrade(data, (res) => {})
  

    }

    componentDidMount(){
      console.log(this.state.courseId);
      
    }

render()
{ 
  var redirectVar = null;
  if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
  }  

    return (

        <div style = {{marginLeft : 300}}>
        <h3> Grades for {this.state.student} </h3>
        <input type="text" name="job_num" value={this.state.Score}
        placeholder = "Score"
        onChange={this.handleScore}></input> / <input type="text" name="job_num" value={this.state.OutOf}
        placeholder = "Outof"
        onChange={this.handleOutOf}></input>
        <button onClick = {this.handleGrade}> Grade </button>
        </div>
    ) 
    
  }
}

export default (connect(null, {giveGrade})(SubmitGrades));