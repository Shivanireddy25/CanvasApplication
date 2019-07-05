import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
//import Bootstrap from "react-bootstrap";
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class profile extends Component {
  
  
  constructor(props) {
    super(props);
    let _isMounted = false;
    this.state = {
      email: "",
      name : localStorage.getItem('name'),
     about : "",
      city : "",
      country : "",
     company : "", 
     school : "",
      hometown : "",
       languages : "",
        gender : ""
    };
  }

  componentDidMount(){
   
    axios.post('http://localhost:9000/profile',  {name : this.state.name}) 
             .then((response) => {
              this._isMounted = true;
               var data = response.data[0];
               console.log("data");
               console.log(this._isMounted);
             //update the state with the response data
             if(this._isMounted){
             this.setState({
                email: data.email ,
                name : localStorage.getItem('name'),
               about : data.about,
                city : data.city,
                country : data.country,
               company : data.company, 
               school : data.school,
                hometown : data.hometown,
                 languages : data.languages,
                  gender : data.gender
             });
            }
         }); 
         console.log(this.state);
 }

 componentWillUnmount() {
   this._isMounted = false;
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

  updateProfile = event => {
    console.log("Button");
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
    axios.post('http://localhost:9000/updateProfile', data)
    .then(res => {
      this.props.history.push('/home/profileUpdated');
    });
  
  }


  render(){
    var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
    return (
      <div className = "Update Profile">
        {redirectVar}
      <div className="Login" style = {{marginTop : 0}}>
      <h1 align = "center"> Profile </h1>
      <Button
            block
            type="button"  onClick = {this.updateProfile} >
           Update Profile
          </Button>     
  
      <img src = "https://sjsu.instructure.com/images/messages/avatar-50.png" style = {{ marginRight : 30, width : 100}}/>  
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
          <Form.Group controlId="name" >
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={this.state.name}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <td>Gender</td>
                  <td>
                    <label>
                      <input type="radio" name="gender" value="Male" onChange={this.genderHandler} checked={this.state.gender === "Male"} />
                      Male&nbsp;</label>
                    <label>
                      <input type="radio" name="gender" value="Female" onChange={this.genderHandler} checked={this.state.gender === "Female"} />
                      Female&nbsp;</label>
                    <label>
                      <input type="radio" name="gender" value="Other" onChange={this.genderHandler} checked={this.state.gender === "Other"} />
                      Other&nbsp;</label>
                  </td>
          <Form.Group controlId="city" >
            <Form.Label>City</Form.Label>
            <Form.Control
              value={this.state.city}
              onChange={this.handleChange}
              type="text"
            />
 </Form.Group>
<Form.Group controlId="about" >
            <Form.Label>About Me</Form.Label>
            <Form.Control
              value={this.state.about}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
         
          <Form.Group controlId="country" >
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={this.state.country}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="company" >
            <Form.Label>Company</Form.Label>
            <Form.Control
              value={this.state.company}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="school" >
            <Form.Label>School</Form.Label>
            <Form.Control
              value={this.state.school}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="hometown" >
            <Form.Label>HomeTown</Form.Label>
            <Form.Control
              value={this.state.hometown}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group>
          <Form.Group controlId="languages" >
            <Form.Label>Languages</Form.Label>
            <Form.Control
              value={this.state.languages}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group> 
          <Button
            block
            type="button"  onClick = {this.updateProfile} >
           Update Profile
          </Button>     
        </form>
      </div>
      </div>
    );
  }
}