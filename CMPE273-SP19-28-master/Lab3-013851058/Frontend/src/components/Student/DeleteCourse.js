import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ROOT_URL} from '../../URLSettings';

export default class DeleteCourse extends Component {
  
  
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
    axios.get(ROOT_URL +`/getCourse/${this.state.id}`, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  })
    .then((response)=>{
          var course = response.data[0];
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
       
    });

 }

 componentWillUnmount() {
   
 }

  //Profile Image, Name, Email, Phone Number, About Me,City, Country, Company, School, Hometown, Languages, Gender

  

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
        name : this.state.name
    }
    console.log(data);

    axios.defaults.withCredentials = true;
    axios.post( ROOT_URL +'/createCourse', data, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  })
    .then(res => {
      this.props.history.push('/home/courses');
    });
  
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
      <div className="Login">
      <h1 align = "center"> Delete Course </h1>
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
          <Button
            block
            type="button"  onClick = {this.createCourse} >
         Delete Course
          </Button>     
        </form>
      </div>
      </div>
    );
  }
}