import React, { Component } from 'react';


import {Redirect} from 'react-router';

import './Quiz.css';
import {createQuiz} from '../../actions/QuizActions';
import { connect } from "react-redux";

 class AddQuiz extends Component {
  constructor() {
    super();
    this.state = {
      name : localStorage.getItem('name'),
      userType : localStorage.getItem('userType'),
      courseId : localStorage.getItem('course'),
      
      qname:"",
      q1: "",
      op11: "",
      op12: "",
      op13: "",
      op14: "",
      cor1: "",
      q2: "",
      op21: "",
      op22: "",
      op23: "",
      op24: "",
      cor2: "",
      d1: "",
      d2: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name] : e.target.value
  })
  }
  
  submitHandler = (e)=>{
      e.preventDefault();
      const data = {
          qname : this.state.qname,
          q1 : this.state.q1,
          op11 : this.state.op11,
          op12 : this.state.op12,
          op13 : this.state.op13,
          op14 : this.state.op14,
          cor1 : this.state.cor1,
          q2 : this.state.q2,
          op21 : this.state.op21,
          op22 : this.state.op22,
          op23 : this.state.op23,
          op24 : this.state.op24,
          cor2 : this.state.cor2,
          d1 : this.state.d1,
          d2 : this.state.d2,
          courseId : this.state.courseId
      }

      this.props.createQuiz(data, (res) => { console.log(res.data);
      this.props.history.push('home/faculty/Courses/quiz')})
      
  }

  render() {
    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    } 
    return (
      <div>
        <div className="pageContent">
          <div className="row">
          
            <div className="col-9 coursecolumn" style = {{left : 300}}>
              <h3>Create Quiz</h3><br />
              
              <div>
                  <form onSubmit={this.submitHandler}>
                    <table>
                        <tbody>
                        <tr>
                        <td>&nbsp;&nbsp;<button type="submit" align= "right"name="publish" className="btn btn-primary" >Publish</button></td>
                            </tr>
                            <tr>
                                <td>Quiz Topic</td>
                                <td>: <input type="text" name="qname" onChange={this.handleChange} required/></td>
                            </tr><tr><td><br/></td></tr>
                            <tr>
                                <td>Question 1</td>
                                <td>: <input type="text" name="q1" className="quizquestion" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;</label></td>
                                <td>: <input type="text" name="op11" onChange={this.handleChange} required /></td>

                                </tr>
                                <tr>
                                <td><label>Option B&nbsp;</label></td>
                                <td>: <input type="text" name="op12" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;</label></td>
                                <td>: <input type="text" name="op13" onChange={this.handleChange} required /></td>
                                </tr>
                                <tr>
                                <td><label>Option D&nbsp;</label></td>
                                <td>: <input type="text" name="op14" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Correct Answer&nbsp;</label></td>
                                <td>: <input type="text" name="cor1" onChange={this.handleChange} required /></td>
                            </tr>
                            
                            <tr>
                                <td>Question 2</td>
                                <td>: <input type="text" name="q2" className="quizquestion" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option A&nbsp;</label></td>
                                <td>: <input type="text" name="op21" onChange={this.handleChange} required /></td>
                                </tr>
                                <tr>
                                <td><label>Option B&nbsp;</label></td>
                                <td>: <input type="text" name="op22" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Option C&nbsp;</label></td>
                                <td>: <input type="text" name="op23" onChange={this.handleChange} required /></td>
                                </tr>
                                <tr>
                                <td><label>Option D&nbsp;</label></td>
                                <td>: <input type="text" name="op24" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Correct Answer&nbsp;</label></td>
                                <td>: <input type="text" name="cor2" onChange={this.handleChange} required /></td>
                            </tr>
                            <tr><td><br/></td></tr>
                            <tr>
                                <td>Available from</td>
                                <td>: <input type="date" name="d1" onChange={this.handleChange} required /></td>
                                <td>Available till</td>
                                <td>: <input type="date" name="d2" onChange={this.handleChange} required /></td>
                            </tr>
                           
                        </tbody>
                    </table>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (connect(null, {createQuiz})(AddQuiz));
