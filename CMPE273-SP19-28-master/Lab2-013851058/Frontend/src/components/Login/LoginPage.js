import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import './Login.css';

import {Redirect} from 'react-router-dom';
import {loginUser} from '../../actions/loginAction';
import { connect } from "react-redux";

 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name : "",
      authFlag : false,
      errorMessage : ""
    };
  }

  validateForm() {
    return  this.state.password.length > 0 && this.state.name.length >0;
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


  signInStudent = event => {
    event.preventDefault();

    //Creating data to be sent
    var data = {
      password : this.state.password,
      name : this.state.name
    }

   
    this.props.loginUser(data, (res) =>  {
  
      if(res.data === "Invalid Credentials!"){
        console.log("Invaid Login");
        this.setState({
            authFlag : false,
            errorMessage : "Invalid Login",
            email: "",
            password: "",
            name : "",
        })
      } 
      else {
      console.log(res.data);
      var resultData = res.data;

      console.log("Inside Login" + resultData);
      if(res.data){
        console.log("Correct Login");
        localStorage.setItem('token' , resultData.Token);
      localStorage.setItem('name' , resultData.name);
      localStorage.setItem('userType' , resultData.userType);
      this.setState({
        authFlag : true
    }) 
    this.props.history.push('/home/courses') }  else {
      
        console.log("Invaid Login");
        this.setState({
            authFlag : false,
            errorMessage : "Invalid Login",
            email: "",
            password: "",
            name : "",
        })
      
    }
  }
     
    });
    

  }
  
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  render(){
   
    return (
      <div className = "Fullpage">
      <div className = "LoginPage" align = "center" >

      <div className="Login">
     
     <div>
     
     <div>
        <h3 className="loginheader">Connecting to <span className="titlespan">SJSU</span></h3>
        <h6 className="loginheader loginheadersub">Sign in with your SJSU ID</h6>
      </div>
      <div className="logodiv" ><img src="https://d92mrp7hetgfk.cloudfront.net/images/sites/misc/san_jose_state_u-1/standard.png?1548463655" alt="Logo" className="loginlogo" /></div>
      </div>
        <form  align= "center">
        <Form.Group controlId="name" >
            <Form.Control
              value={this.state.name}
              placeholder = "Name"
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="password" >
            <Form.Control
            placeholder = "Password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
           <Button
            block
           
            //disabled={!this.validateForm()}
            onClick = {this.signInStudent}
            type="button"
          >
            Sign In As Student
          </Button>
          <Button
            block
           
            //disabled={!this.validateForm()}
            onClick = {this.signInStudent}
            type="button"
          >
            Sign In As Faculty
          </Button>
          
          Not a Member?  <Link to="/signup">Signup</Link>
          <p>  {this.state.errorMessage}</p>
        </form>
      </div>
      </div>
      </div>
    );
  }
}

export default (connect(null, { loginUser })(Login));