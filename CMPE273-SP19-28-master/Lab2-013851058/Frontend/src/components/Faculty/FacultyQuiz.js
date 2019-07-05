
 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import styles from '../Faculty/Quiz.css';
 import {Redirect} from 'react-router';
 import {getQuiz} from '../../actions/QuizActions';
 import { connect } from "react-redux";
 
class FacultyQuiz extends Component {
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

    this.props.getQuiz({courseId : this.state.courseId}, (response)=>{
      
      this.setState({
        quizzes: response.data
      })
    
  } )
  
   }
 
   render() {
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
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
                   return <div className="quiztab" key={index}><Link to={`/home/student/Courses/quiz/${quiz._id}`}>  {quiz.qname}</Link></div>
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
 
 export default (connect(null, { getQuiz})(FacultyQuiz));
 



