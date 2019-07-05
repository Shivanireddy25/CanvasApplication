import React, { Component } from 'react';
import {Redirect} from 'react-router';


export class ProfileUpdated extends Component {
   
  render() {
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
   
    return (
      
        <div style = {{marginLeft : 300}}>
        <h1> Profile Updated Successfully </h1>
  </div>
        

    )
  }
}

