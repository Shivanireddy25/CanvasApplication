import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

var randomColor = require('randomcolor');


export class ProfileUpdated extends Component {
   
  render() {
    var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
   
    return (
      
        <div style = {{marginLeft : 300}}>
        <h1> Profile Updated Successfully </h1>
  </div>
        
      
     

    )
  }
}

