import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';



export default class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get()
      .then(({ data }) => {
        this.setState({
          results: data.data                           
        })
      })
    }

    handleInputChange = () => {
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo()
          }
        } 
      })
    }
  
    render() {
      var redirectVar = null;
  if(!cookie.load('cookie')){
    console.log("Still in home");
    redirectVar = <Redirect to= "/" />
    return redirectVar;
} 
      return (
        <form>
          <input
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <p>{this.state.query}</p>
        </form>
      )
    }
  }
  
  