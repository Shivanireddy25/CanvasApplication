
 import React, { Component } from 'react';
 import cookie from 'react-cookies';
 import { Link } from 'react-router-dom';
 import axios from 'axios';
 import styles from '../Faculty/Quiz.css';
 import {Redirect} from 'react-router';
 
 export default class FacultyQuiz extends Component {
   constructor(props) {
     super(props);
 
     this.state = {
       name : localStorage.getItem('name'),
       userType : localStorage.getItem('userType'),
       courseId : localStorage.getItem('course'),
       quizzes : ""
     }
   }
 
   componentDidMount(){
     axios.post("http://localhost:9000/getQuiz", {courseId : this.state.courseId})
     .then((response)=>{
      
         this.setState({
           quizzes: response.data
         })
       
     })
   }
 
   render() {
     var redirectVar = null;
     if(!cookie.load('cookie')){
       console.log("Still in home");
       redirectVar = <Redirect to= "/" />
       return redirectVar;
   } 
     let quizzes = [];
     Object.assign(quizzes, this.state.quizzes);
     return (
       <div>
        
         <div className="pageContent">
           <div className="row">
             <div className="col-9 coursecolumn" style = {{left: 300}}>
               <h3>Quiz</h3><br/>
               <p> Following quizzes are available! Click on Create quiz to create a new one</p>
               <div>
                 {quizzes.map((quiz,index)=>{
                   return <div className="quiztab" key={index}><Link to={`/home/student/Courses/quiz/${quiz.id}`}>{quiz.id} - {quiz.qname}</Link></div>
                 })}
                 {(this.state.userType==="faculty")
?<Link to={`/home/faculty/Courses/addquiz`}><button className="btn btn-primary">Create Quiz</button></Link>
:null} 

               </div>
           
             </div>
           </div>
         </div>
       </div>
     )
   }
 }
 
 
 



