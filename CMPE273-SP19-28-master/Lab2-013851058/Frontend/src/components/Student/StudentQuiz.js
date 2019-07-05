import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Faculty/Quiz.css';
import {Redirect} from 'react-router';
import {getQuiz} from '../../actions/QuizActions';
 import { connect } from "react-redux";

 class StudentQuiz extends Component {
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
              <h3>Quizs Available! </h3><br/>
              <h4>Click on the Quiz link to take quiz</h4><br/>
              <div>
                {quizzes.map((quiz,index)=>{
                  return <div className="quiztab" key={index}><Link to={`/home/student/Courses/quiz/${quiz._id}`}> {quiz.qname}</Link></div>
                })}
              </div>
          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (connect(null, { getQuiz})(StudentQuiz));

