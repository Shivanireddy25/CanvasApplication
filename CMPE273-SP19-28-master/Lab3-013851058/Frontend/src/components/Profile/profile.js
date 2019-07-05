import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//import {getProfile} from '../../actions/profileAction';
//import {updateProfile} from '../../actions/profileAction';
import {ROOT_URL} from '../../URLSettings';
import axios from 'axios';

import {graphql, compose} from 'react-apollo';
import {profile} from '../../queries/queries';
import {updateProfile} from '../../mutation/mutations';
import {withApollo} from 'react-apollo';

 class Profile extends Component {
  
  
  constructor(props) {
    super(props);
    let _isMounted = false;
    this.state = {
      email: "",
      name : localStorage.getItem('name'),
      token : localStorage.getItem('token'),
     about : "",
      city : "",
      country : "",
     company : "", 
     school : "",
      hometown : "",
       languages : "",
        gender : "",
        profilepic : ""
    };

    this.addpicture = this.addpicture.bind(this);
    this.savepicture = this.savepicture.bind(this);
  }

  componentWillReceiveProps({ user }) {

}

  componentDidMount(){
  
    console.log("Mounting")
    this.props.client.query({
      query : profile,
      variables : {
        name : this.state.name
      }
    }).then((response) => {
      console.log(response.data.profile);

      var data = response.data.profile;
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
    })
   
    /*this.props.getProfile({name : this.state.name}, (res) =>  {
      
               var data = res.data;
               console.log(data);
              
             //update the state with the response data
            
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
            
     
    }); */
   
 }

 componentWillUnmount() {
   this._isMounted = false;
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

  updateProfile = event => {
    console.log("Button");
    event.preventDefault();
   /* var data = {
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
    this.props.updateProfile(data, (res) => {
      this.props.history.push('/home/profileUpdated');
    }) */

    this.props.client.mutate({
      mutation: updateProfile,
      variables:{
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

  }).then((response)=>{
    console.log('Resposne', response.data);
    this.props.history.push('/home/profileUpdated');
});
  
  }

addpicture = (e) => {
    if (e.target.name === 'selectedFile') {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
}

componentWillMount()
    {
    
        axios.post(`${ROOT_URL}/getprofilepic/profile_${localStorage.getItem('name')}.jpg`)
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setState({
                        profilepic: imagePreview
                    })
                }); 

    }

savepicture = (e) =>
{
  
    const desc = this.props.profile.name;

    const  data  = Object.assign({},this.state);

    //const { files } = this.state;
    let formData = new FormData();
    console.log(desc);
    console.log(data.selectedFile);

    formData.append('description', desc);
    formData.append('selectedFile', data.selectedFile);
 

    axios.post(`${ROOT_URL}/addpic`, formData)
    .then((result) => {
      this.setState({selectedFile : ''});
      this.componentDidMount();
  });
   

}
  


  render(){
    var redirectVar = null;
    if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
    }  
    return (
      <div className = "row">
    
    <div style = {{marginLeft: 200, width : 300}}>
       <img src={this.state.profilepic}
                     className="image--cover" />
                <form>
                    <div className="form-group" style = {{width : 300}}>
                        <input type="file" className="form-control-file" name="selectedFile" onChange={this.addpicture} /> 

                        <Button
            block
            type="button"  onClick = {this.savepicture} >
          Save Profile Picture
          </Button>     
                        <Form.Group controlId="name" >
            <Form.Label> <strong>  Name </strong></Form.Label>  </Form.Group>
            <Form.Group controlId="Name" >
            <Form.Label>  {this.state.name}  </Form.Label>  </Form.Group>
            <Form.Group controlId="email" >
            <Form.Label> <strong>  Email </strong></Form.Label>  </Form.Group>
            <Form.Group controlId="Email" >
            <Form.Label>  {this.state.email}  </Form.Label>  </Form.Group>
            
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
          
          
                    </div>
                </form>
                </div>
      <div className="Profile" style = {{marginTop : 0}}>
      <h1 align = "center"> Profile </h1>
     
      <Button
            block
            type="button"  onClick = {this.updateProfile} >
           Update Profile
          </Button>     
  
       
        <form  align= "center">
          
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
          
        </form>
      </div>
    
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    profile : state.profile
  };
}

//export default (connect(mapStateToProps, { getProfile , updateProfile})(profile));
export default withApollo(Profile);