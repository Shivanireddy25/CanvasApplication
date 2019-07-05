import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Message.css";
import {Redirect} from 'react-router-dom';
import {createConvo, getConvo} from '../../actions/MessagingActions';
import { connect } from "react-redux";


class Messages extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            from: localStorage.getItem('name'),
            to: '',
            sub: '',
            msg: '',
            threads: []
        }
        this.toActionHandler = this.toActionHandler.bind(this)
        this.subHandler = this.subHandler.bind(this)
        this.messHandler = this.messHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    toActionHandler = (e) => {
        this.setState({ to: e.target.value})
    }
    
    subHandler = (e) => {
        this.setState({ sub: e.target.value})
    }
    
    messHandler = (e) => {
        this.setState({ msg: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        
        let data = {
            from: this.state.from,
            to: this.state.to,
            sub: this.state.sub,
            msg: this.state.msg,
           
        }
        this.props.createConvo(data,(response) => {
            this.componentDidMount();
         });
      
    }

    componentDidMount(){
        
         var value = this.state.from;
        this.props.getConvo(value,(result) => {
        
            this.setState({ threads: result.data});
           
        } );
       
    }

  render() {

    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    } 
      let threads =[];
      Object.assign(threads, this.state.threads);
    return (
      <div>
            
            <div className="pageContent">
                <div className="row" style = {{marginLeft :100}} >
                    <div className="col-3 threads">
                        <div name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '500px',
                            overflow: 'scroll',
                        }}>
                        <div>
                            <h3 style = {{marginLeft : 120}}> Messages <i class="fas fa-comments fa-2x"></i></h3>
                        {(threads[0])
                            ? threads.map((msg, index) => 
                                (msg.FromUser === this.state.from)
                                ?<Link to={`/home/messages/${msg.ToUser}/${msg.sub}`} key={index} ><div className="thread" ><strong>Subject :{msg.sub}</strong><br/>{msg.FromUser}</div></Link>
                                :<Link to={`/home/messages/${msg.FromUser}/${msg.sub}`} key={index} ><div className="thread"><strong>{msg.sub}</strong><br/>{msg.ToUser}</div></Link>
                            )
                            :" "}
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <h5>Start a Conversation <i class="fas fa-envelope-open-text fa-2x"></i>

</h5><br/>
                        <form className="compose" onSubmit={this.submitHandler}>
                            <input type="text" placeholder="To: User Name" onChange={this.toActionHandler} required /><br/>
                            <input type="text" placeholder="Subject" onChange={this.subHandler} required /><br/>
                            <textarea rows="5" cols="100" placeholder="Write your message here" onChange={this.messHandler} required /><br/>
                            <input type="submit" className="btn btn-primary" value="Send"></input>
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


export default (connect(null, {createConvo, getConvo})(Messages));

