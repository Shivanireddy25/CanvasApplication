import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";

 class Home extends Component {
    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            token : localStorage.getItem('token'),
            courses : []
        }
    }  

    
   
    componentDidMount(){
       console.log(this.props.loginStateStore);
    }

    signOut = event => {
        localStorage.removeItem('name');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        localStorage.removeItem('course');
        this.props.history.push('/');

    }

    

    render(){

        //if not logged in go to login page
        var redirectVar = null;
        if(!localStorage.getItem('token')){
                redirectVar = <Redirect to="/" />
                return redirectVar;        
        }  
      
        
            let courses = this.state.courses.map(course => {
                return(
                    <div class="card" >
   <div class="card-body" >
    <h5 class="card-title">{course.CourseId}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{course.CourseName}</h6>
    <p class="card-text">{course.CourseDescription}</p>
    <a href="#" class="card-link">Enroll</a>
    <a href="#" class="card-link">Delete</a>
  </div>
  </div>
                )
            })
                return (
                   
                  
                    <div className = "container">
                    <div className = "row">
                    <div className = "col-sm-3" id = "icon"> 
                    </div>
                    <div className = "col-sm-7" align ="center"> 
                    <div class="alert alert-dark" role="alert">
                    <h2> Hola {this.state.name} !! Welcome to SJSU  </h2>   
                    </div>
                    
                    
                    </div>
                    <div className = "col-sm-2" align ="center"> 
                    <button type="button" class="btn btn-danger" align = "right" onClick={this.signOut}>SignOut</button>
                    </div>
                    </div>
                    
                    <div className = "col-sm-1"> 
                    
                    <div className = "row" id = "menu-item">
                   
                    <div>
                    <NavLink  to="/home/courses" activeClassName="active">Home</NavLink> <br/>
                    <i class="fas fa-home fa-3x"></i>


                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                   
                    <div>
                    <NavLink to="/home/CourseSection" activeClassName="active">Courses</NavLink> <br/>
                    <i class="fas fa-book fa-3x"></i>
                    </div>
                    </div>
                    
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/home/dashboard" activeClassName="active">Dashboard</NavLink> <br/>
                    <i class="fas fa-tachometer-alt fa-3x"></i>


                    </div>
                    </div>
                    
                    <div className = "row" id = "menu-item">
                    <NavLink to="/home/profile" activeClassName="active">Profile</NavLink> <br/>
                    <i class="fas fa-user-alt fa-4x"></i>
                    <div>
                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/home/Messages" activeClassName="active">Inbox</NavLink> <br />
                    <i class="fas fa-inbox fa-3x"></i>


                    </div>
                    </div>
                    <div className = "row" id = "menu-item">
                    
                    <div>
                    <NavLink to="/home/People" activeClassName="active">People</NavLink> <br/>
                    <i class="fas fa-user-friends fa-3x"></i>

                    </div>
                    
                    </div>
                    </div>   
                    </div>
                    
                );
    }
}

const mapStateToProps = state => ({
    loginStateStore : state.login
})

export default connect(mapStateToProps, null)(Home)

