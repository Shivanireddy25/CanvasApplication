import React, {Component} from 'react';
import {Redirect} from 'react-router';
//import {getUserCourses} from '../../actions/CourseAction';
import { connect } from "react-redux";
import {userCourses} from '../../queries/queries';
import { graphql } from 'react-apollo';


import {withApollo} from 'react-apollo';

class CourseSection extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            courses : [],
            value : '',
            token : localStorage.getItem('token')
        }
    }  

    courseClicked = event => {
        event.preventDefault();
      console.log(event.target.value);
      
      localStorage.setItem('course', event.target.value);
      if(this.state.userType === 'faculty'){
       this.props.history.push('/home/faculty/Courses');
      } else {
      this.props.history.push('/home/student/Courses');
      }
      
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

      /*  this.props.getUserCourses({ name : this.state.name , userType : this.state.userType}, (res) => {this.setState({
            courses  : res.data
        }); }) */

    }

render()
{ 
    var redirectVar = null;
 
    if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
     }  
    let courses = this.state.courses.map(course => {
        return( <div>
  <div class="list-group">
  
   <button type="button" id ="courseButton" value={course.CourseId} class="list-group-item list-group-item-action" onClick = {this.courseClicked}> {course.CourseId}</button>

 
  </div>

           
   </div>
           
        )
    })
    return (
  
        <div className = "courseList" style={{marginLeft: '100px', width: "100px"}}>
            {courses} 
        </div>
    )
    
  }
}

export default withApollo(CourseSection);
//export default (connect(null, { getUserCourses })(CourseSection));



