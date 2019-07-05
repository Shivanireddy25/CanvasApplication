import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {giveGrade} from '../../actions/GradeActions';
import { connect } from "react-redux";
import {getQuizContent} from '../../actions/QuizActions';
class TakeQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : localStorage.getItem('name'),
            id: this.props.match.params.id,
            userType : localStorage.getItem('userType'),
            courseId : localStorage.getItem('course'),
            quiz:"",
            ans1: "",
            ans2: ""
        }
        this.handleChange = this.handleChange.bind(this);
       
    }

    componentDidMount(){
        var id = this.state.id;
        this.props.getQuizContent(id, (response)=>{
            // console.log(response.data);
            this.setState({
                quiz: response.data
            })
            console.log(this.state.quiz)
        } );
     
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
     
    submithandler = (e)=>{
        e.preventDefault();
        const data = {
            ans1: this.state.ans1,
            ans2: this.state.ans2
        }
        console.log(this.state.ans1 ,this.state.ans2);
        console.log(this.state.quiz);
        var marks = 0;
        if(this.state.ans1 === this.state.quiz.cor1){
            marks ++;
        }
        if(this.state.ans2 === this.state.quiz.cor2){
            marks ++;
        }
        console.log(marks); 
            
        var grade = {
        
             SubmissionId : this.state.quiz.qname,
             name : this.state.name,
             Score : marks,
             Outof : 2,
             CourseId:this.state.courseId
            }
           

            this.props.giveGrade(grade, (res) => {  this.props.history.push('/home/student/Courses/quizSubmitted/');});
       
     
    }

    render() {
        var redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to="/" />
            return redirectVar;        
        }  
        let q = {};
        
        Object.assign(q,this.state.quiz);
        return (
            <div>
                
                <div className="pageContent">
                    <div className="row">
                       
                        <div className="col-9 coursecolumn" style = {{left :300}}>
                            <h3>{q.qname}</h3><br />
                            <div>
                                <form onSubmit={this.submithandler}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>{q.q1}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="a" onChange={this.handleChange} checked={this.state.ans1==="a"} required/></label>&nbsp;{q.op11}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="b" onChange={this.handleChange} checked={this.state.ans1==="b"} /></label>&nbsp;{q.op12}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="c" onChange={this.handleChange} checked={this.state.ans1==="c"} /></label>&nbsp;{q.op13}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="d" onChange={this.handleChange} checked={this.state.ans1==="d"} /></label>&nbsp;{q.op14}</td>
                                        </tr><tr><td><br/></td></tr>
                                        <tr>
                                            <td>{q.q2}</td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="a" onChange={this.handleChange} checked={this.state.ans2==="a"} required/></label>&nbsp;{q.op21}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="b" onChange={this.handleChange} checked={this.state.ans2==="b"} /></label>&nbsp;{q.op22}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="c" onChange={this.handleChange} checked={this.state.ans2==="c"} /></label>&nbsp;{q.op23}</td>
                                        </tr>   
                                        <tr>
                                            <td><label><input type="radio" name="ans2" value="d" onChange={this.handleChange} checked={this.state.ans2==="d"} /></label>&nbsp;{q.op24}</td>
                                        </tr> <tr><td><br/></td></tr>
                                        {(this.state.userType==='student')?<tr><td><button type="submit" name="submit" className="btn btn-primary" >Submit</button></td></tr>:
                                    <p> <b>Since you are faculty member! you can only view quiz </b></p>}
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

export default (connect(null, { giveGrade, getQuizContent})(TakeQuiz));
