import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import {waitlistCourse} from '../../actions/CourseAction';
import { connect } from "react-redux";
import {getCourse} from '../../actions/CourseAction';


 class WaitListCourse extends Component {
  
  
  constructor(props) {
    super(props);
   
    this.state = {
        id: this.props.match.params.id,
        
       CourseId : '',
        CourseDescription: '',
        CourseRoom : '',
        CourseName : '',
        CourseDept : '',
       name : localStorage.getItem('name'),
        CourseCapacity : '',
        Waitlistcapacity : '',
        courseTerm : '',
        currentStrength : '',
       
      createdBy : localStorage.getItem('userType'),
      
      
    
    };
  }

  componentDidMount(){
     var  value = this.state.id;

   this.props.getCourse(value,(response)=>{
    console.log(response.data);
        var course = response.data;
      this.setState({
          CourseId : this.state.id,
          CourseDescription: course.CourseDescription,
          CourseRoom : course.CourseDescription,
          CourseName : course.CourseName,
          CourseDept : course.CourseDept,
         name : localStorage.getItem('name'),
          CourseCapacity : course.CourseCapacity,
          Waitlistcapacity : course.Waitlistcapacity,
          courseTerm : course.courseTerm,
          currentStrength : '',
         
        createdBy : localStorage.getItem('userType'),
          
      })
     
  } );

 }

 componentWillUnmount() {
   
 }

  componentWillMount(){
    this.setState({
        authFlag : false
    })
  }

  handleChange = event => {
    console.log("clo")
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  createCourse = event => {
   
    event.preventDefault();
    var data = {
        CourseId: this.state.CourseId,
        CourseDescription: this.state.CourseDescription,
        CourseRoom : this.state.CourseRoom,
        CourseName : this.state.CourseName,
        CourseDept : this.state.CourseDept,
        createdBy : this.state.createdBy,
        CourseCapacity : this.state.CourseCapacity,
        Waitlistcapacity : this.state.Waitlistcapacity,
        courseTerm : this.state.courseTerm,
        currentStrength : this.state.currentStrength,
        name : this.state.name,
        status : "WAITLISTED"
    }
    console.log(data);

    this.props.waitlistCourse(data, (res) => {
      this.props.history.push('/home/courses');
    })
  
  }


  render(){
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    return (
      <div className = "AddCourse">
        {redirectVar}
        
      
      <div className="Login" style = {{marginTop : 0}}>
      <h1 align = "center"> WaitList Course </h1>
      <Button
            block
            type="button"  onClick = {this.createCourse} >
         WaitList Course
          </Button>     
        <form  align= "center">
        
        
          <Form.Group controlId="CourseName" >
            <Form.Label>CourseName</Form.Label>
            <Form.Control
              value={this.state.CourseName}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="CourseDept" >
            <Form.Label>CourseDept</Form.Label>
            <Form.Control
              value={this.state.CourseDept}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
       
          <Form.Group controlId="CourseDescription" >
            <Form.Label>CourseDescription</Form.Label>
            <Form.Control
              value={this.state.CourseDescription}
              onChange={this.handleChange}
              type="text"
            />

<Form.Group controlId="CourseRoom" >
            <Form.Label>CourseRoom</Form.Label>
            <Form.Control
              value={this.state.CourseRoom}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          </Form.Group>
          <Form.Group controlId="CourseCapacity" >
            <Form.Label>CourseCapacity</Form.Label>
            <Form.Control
              value={this.state.CourseCapacity}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="Waitlistcapacity" >
            <Form.Label>Waitlistcapacity</Form.Label>
            <Form.Control
              value={this.state.Waitlistcapacity}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="courseTerm" >
            <Form.Label>courseTerm</Form.Label>
            <Form.Control
              value={this.state.courseTerm}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="currentStrength" >
            <Form.Label>currentStrength</Form.Label>
            <Form.Control
              value={this.state.currentStrength}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
         
        </form>
      </div>
      </div>
    );
  }
}
export default (connect(null, { waitlistCourse, getCourse})(WaitListCourse));