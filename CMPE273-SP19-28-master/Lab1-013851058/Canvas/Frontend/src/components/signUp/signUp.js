import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
//import Bootstrap from "react-bootstrap";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Checkbox = props => (
 
  <input type="checkbox" {...props} />
)

export default class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name : "",
     about : "",
      city : "",
      country : "",
     company : "", 
     school : "",
      hometown : "",
       languages : "",
        gender : "",
        userType :""
    };
  }

  //Profile Image, Name, Email, Phone Number, About Me,City, Country, Company, School, Hometown, Languages, Gender

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length >0;
  }

  componentWillMount(){
    this.setState({
        authFlag : false
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  
  setGender(event) {
    console.log(event.target.value);
    var value = event.target.value;
    this.setState({
      gender1 : value
    });
    }
  

  setUserType(event) {
    console.log(event.target.value);
    var value = event.target.value;
    this.setState({
      userType : value
    });
    }
  
  

  signUpStudent = event => {
    event.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password,
      name : this.state.name,
     about : this.state.about,
      city : this.state.city,
      country : this.state.country,
     company : this.state.company, 
     school : this.state.school,
      hometown : this.state.hometown,
       languages : this.state.languages,
        gender : this.state.gender,
        userType : this.state.userType
    }
    console.log(data);

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:9000/signUp', data)
    .then(res => {
      this.props.history.push('/');
    });
  
  }

  render(){

   
    return (
      <div className = "LoginPage - Component">
      
      <div className="Login">
     <div>
       <h2 align = "center">Sign Up now!!</h2>
     </div>
        <form  align= "center">
        
          
          <Form.Group controlId="email" >
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" >
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Form.Group controlId="name" >
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={this.state.name}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <fieldset>
      <div onChange={this.setUserType.bind(this)}>
      I am a &nbsp;
        <input type="radio" value="student" name="gender"/> Student &nbsp;
        <input type="radio" value="faculty" name="gender"/> Faculty
      </div>
      </fieldset>

          <Button
            block
            
           disabled={!this.validateForm()}
            type="button"  onClick = {this.signUpStudent}
          >

           Create an account 
          </Button>

          
        </form>
      </div>
      </div>
    );
  }
}