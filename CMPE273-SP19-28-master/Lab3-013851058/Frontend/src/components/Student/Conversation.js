import React, { Component } from 'react';

import Scroll from 'react-scroll';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../Faculty/Message.css";
import  {createMessage, getMessage} from '../../actions/MessagingActions';
import { connect } from "react-redux";

class Conversation extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            FromUser: localStorage.getItem('name'),
            ToUser: this.props.match.params.id,
            sub: this.props.match.params.sub,
            texts: null
        }
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    messageHandler = (e) => {
        this.setState({ message: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        
        const data = {
            from: localStorage.getItem('name'),
            text: this.state.message,
            to : this.state.ToUser,
            sub : this.state.sub
           
        }

        this.props.createMessage(data, (response)=>{
            console.log(response.data);
           this.props.history.push('/home/Messages');
        } )

    }

    componentDidMount(){
      
        const data  = {
            ToUser : this.state.ToUser,
            sub : this.state.sub
        }
         this.props.getMessage(data, (response) => {
            console.log(response.data.msg);
            this.setState({ texts: response.data.msg})
        })

    }

  render() {

    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
      let texts = [];
      Object.assign(texts, this.state.texts);
    return (
      <div>
            <div className="pageContent" >
                <div className="row" style = {{marginLeft :100}}>
                    <div className="col-12">
                        <div name="text" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '300px',
                            overflow: 'scroll',
                            width: "100%",
                            marginLeft : "200"
                        }}>
                        <i><h3 style = {{marginLeft : 200}}> Conversation between {this.state.FromUser} and  {this.state.ToUser} <i  class="far fa-comment-dots fa-2x" ></i></h3> 
                        </i> 

                        <h4 style = {{marginLeft : 200}}> Subject : {this.state.sub}   </h4>
                        {texts.map((t, index) => {
                            return <div style = {{marginLeft : 200}} key={index} className="text">
                            <span className="textname">{t.from}</span><br/>
                            {t.text}</div>
                        })}
                        </div>
                        <form   style = {{marginLeft : 150}} onSubmit={this.submitHandler} style={{padding: "10px 0"}}>
                            <textarea rows="5"  placeholder="message" onChange={this.messageHandler} style={{width: "100%", marginLeft : 200}} />
                            <Link style = {{marginLeft : 200}}to="/home/messages"><button className="btn btn-primary">Back</button></Link>&nbsp;
                            <input type="submit" value="Reply" className="btn btn-primary" required />
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


export default (connect(null, {createMessage, getMessage})(Conversation));