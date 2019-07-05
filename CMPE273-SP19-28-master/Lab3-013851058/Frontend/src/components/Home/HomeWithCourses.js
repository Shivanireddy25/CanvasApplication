import React, {Component} from 'react';
import '../../App.css';


import {Redirect} from 'react-router';



import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { connect } from "react-redux";
//import {getUserCourses} from '../../actions/CourseAction';
import {userCourses} from '../../queries/queries';
import { graphql } from 'react-apollo';


import {withApollo} from 'react-apollo';
 

var randomColor = require('randomcolor');


class HomeCourses extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            token : localStorage.getItem('token'),
            courses : [],
            search :''
        }
        this.searchCourses = this.searchCourses.bind(this);
    }  

    
   
    componentDidMount(){

        this.props.client.query({
            query : userCourses,
            variables: {
                name : this.state.name,
               // password : this.state.password
            }
        }).then((res) => {
        console.log(res);


        if(res.data.userCourses.result) {
            this.setState({
                courses : res.data.userCourses.courseDetails
            });
        }

        })







       /* console.log(this.props.loginStateStore);
        var data = {
            name : this.state.name,
            userType : this.state.userType
            }
            this.props.getUserCourses(data,(response) => {
                //update the state with the response data
                this.setState({
                    courses : response.data
                });
            } )  */
     
    }

    searchCourseValue = event => {
        console.log(event.target.value);
        this.setState({
            search : event.target.value
        })
       // this.props.history.push("/home/searchCourse");
    }

    searchCourses = event => {
        console.log(event.target.value);
        this.props.history.push("/home/searchCourse");
    }

   
    render(){
        //if not logged in go to login page
       
        var redirectVar = null;
        const isFaculty = (this.state.userType === 'faculty') ? true : false;

        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to="/" />
            return redirectVar;        
    }  
           
            let courses = this.state.courses.map(course => {
                return(
                    
                    
                   
                                  
 <div class="card" style = {{width :302 ,marginLeft: 5, marginRight : 5,height: 202, marginTop : 5, marginBottom : 5}}>
   <div class="card-body" style = {{backgroundColor : randomColor(), height : 130}}>
  </div>
  <h6 class="card-subtitle mb-2 text-muted">{course.CourseId}</h6>
    <p class="card-text">{course.CourseName}</p>
  
   
    </div>
      )
            })
                return (
                   <div>
                         {isFaculty ? <a href="/home/AddCourse" class="btn btn-info" style = {{marginLeft : 200}}role="button">Create Course</a> : ''} 
                  {!isFaculty ? <div class="form-group has-search">
           <button  style = {{marginLeft : 200}}>  <Link to={`/home/searchCourse/`}  >Search for Courses </Link>  <i class="fas fa-search"></i>
             </button>
                  
                  </div> : ''}
                   
                   <div>
                    <div className = "col-sm-11" id = "courseSection" >  
                 
                      {courses}
                    
                    </div>
                    </div>
                    </div>
                    
                );
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})


//export default connect(mapStateToProps, {getUserCourses})(HomeCourses)
export default withApollo(HomeCourses);


/*{!isFaculty ? 
    <div> 
    {course.CourseCapacity !== ''  ? <Link to={`/home/enrollCourse/${course.CourseId}`} class="card-link" >Enroll </Link>
: <Link to={`/home/waitListCourse/${course.CourseId}`} class="card-link" >Enroll </Link> }
    <Link to={`/home/deleteCourse/${course.CourseId}`} class="card-link" >Delete </Link> 
    </div> : ''} */