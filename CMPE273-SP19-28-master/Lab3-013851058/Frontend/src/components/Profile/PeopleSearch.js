import React, { Component } from 'react';

import styles from '../Student/Student.css';
import axios from 'axios';

import {ROOT_URL} from '../../URLSettings';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

var randomColor = require('randomcolor');
export default class PeopleSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
          id: this.props.match.params.id,
            searchterm: "",
            courses: [],
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courseId : localStorage.getItem('course'),
            page: 0,
            limit: 4

        }
        this.serachtermHandler = this.serachtermHandler.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        
        
    }

    serachtermHandler = (e) => {
        this.setState({
            searchterm: e.target.value
        })
        var data = {
          name : this.state.name,
           userType : this.state.userType,
           id : this.state.searchterm
          }
        console.log(this.state.searchterm);
      
    }


    handleNext = (e) => {
      this.paginate(1);
      let currentPage = this.state.page + 1
      axios.get(ROOT_URL +`/people/search?page=${currentPage}&limit=${this.state.limit}&searchTerm=${this.state.searchterm}`, 
      {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
        .then((response) => {
          console.log(response.data.data)
          if (response.data.message === "error") {
            alert("Something went wrong!")
            this.props.history.push("/course")
          }
          else if (response.data.message === "success") {
            if (!response.data.data[0]) {
              this.paginate(-1)
            }
            else {
              this.setState({ courses: response.data.data })
            }
          }
        })
    }
    
    handlePrevious = (e) => {
      let currentPage = this.state.page - 1
      if (currentPage < 0 || this.state.page === 0) {
        currentPage = 0;
      }
      else {
        this.paginate(-1);
      }
      axios.get( ROOT_URL + `/people/search?page=${currentPage}&limit=${this.state.limit}&searchTerm=${this.state.searchterm}`, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    })
        .then((response) => {
          if (response.data.message === "error") {
            alert("Something went wrong!")
            this.props.history.push("/course")
          }
          else if (response.data.message === "success") {
            this.setState({ courses: response.data.data })
          }
        })
    }

    handleSearch = (e) => {
      var data = {
        name : this.state.name,
         userType : this.state.userType,
         id : this.state.searchterm
        }
        console.log(this.state.id) ;

   axios.post( ROOT_URL + `/searchPeople`, data, {
    headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
} ) 
            .then((response) => {
            //update the state with the response data
            this.setState({
                courses : response.data
            });
        });  
    }

    paginate(n){
        this.setState({ page: this.state.page + n})
    }

    componentDidMount(){
      var data = {
        name : this.state.name,
         userType : this.state.userType,
         id : this.state.id
        }
        console.log(this.state.id) ;

   axios.get(ROOT_URL + `/allPeople`, {
    headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
} ) 
            .then((response) => {
            //update the state with the response data
            this.setState({
                courses : response.data
            });
        });  
    }

  render() {
    const isFaculty = (this.state.userType === 'faculty') ? true : false;
    var redirectVar = null;
    if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
    }  
 
    let courses = [];
    Object.assign(courses, this.state.courses);
    let courseAll = this.state.courses.map(course => {
      return(
          
          
                
        <div class="card"  style = {{width :302 ,marginLeft: 5, marginRight : 5,height: 202, marginTop : 5, marginBottom : 5}}>
<div class="card-body"  style = {{backgroundColor : randomColor(), height : 100}}>

<i class="fas fa-user-alt fa-3x"></i>
<p> {course.userType} </p>
<p>  {course.name}</p>
</div>
<h6 class="card-subtitle mb-2 text-muted">{course.CourseId}</h6>





</div>


          

      )
  })

    return (
      <div>
       
        <div className="pageContent">
        <div> <button style = {{marginLeft : 200}} onClick= {this.handleSearch}> Search </button></div>
          <div className="row coursesearch">
            <input type="text" name="searchterm" className="searchinput" placeholder= {this.state.searchterm} onChange={this.serachtermHandler}/>
            <br></br>
            {courseAll}
   
          </div>
        </div>
        <div className="navbuttons" style = {{ marginLeft : 1000 , marginTop : 400}}>
            <button className="btn btn-primary nxt" onClick={this.handlePrevious}> Previous </button>&nbsp;
            <button className="btn btn-primary prv" onClick={this.handleNext}>Next</button>&nbsp;&nbsp;&nbsp;
          </div>
      </div>
    )
  }
}



/*{!isFaculty ? 
    <div> 
    {course.CourseCapacity !== ''  ? <Link to={`/home/enrollCourse/${course.CourseId}`} class="card-link" >Enroll </Link>
    : <Link to={`/home/waitListCourse/${course.CourseId}`} class="card-link" >Enroll </Link> }
    <Link to={`/home/deleteCourse/${course.CourseId}`} class="card-link" >Delete </Link> 
    </div> : ''} */