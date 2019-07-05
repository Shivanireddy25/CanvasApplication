import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Bootstrap from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
//import {createCourses} from '../../actions/CourseAction';
import {createCourse} from '../../mutation/mutations';
import {graphql, compose} from 'react-apollo';
import {withApollo} from 'react-apollo';






 class AddCourse extends Component {
  
  
  constructor(props) {
    super(props);
   
    this.state = {
        CourseId: '',
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
    console.log("Button");
    event.preventDefault();


    this.props.client.mutate({
      mutation: createCourse,
      variables:{
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

  }).then((response)=>{
    console.log('Resposne', response.data);
    this.props.history.push('/home/courses');
});







   /* var data = {
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
     this.props.createCourses(data, (res) =>  {this.props.history.push('/home/courses');}) */
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
      <h1 align = "center">  Course Creation </h1>
        <form  align= "center">
        <Button
            block
            type="button"  onClick = {this.createCourse} >
          Add Course
          </Button>     
        
          <Form.Group controlId="CourseId" >
            <Form.Label>CourseId</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={this.state.CourseId}
              onChange={this.handleChange}
            />
          </Form.Group>
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

//export default (connect(null, {createCourses})(AddCourse));
export default withApollo(AddCourse);