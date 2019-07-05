import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {ROOT_URL} from '../../URLSettings';



export default class File extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      course: localStorage.getItem('course'),
      file: null
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get(ROOT_URL + `/file/${this.state.course}`)
    .then((response)=>{
      // console.log(response.data);
      
      
        this.setState({
          file: response.data
        })
      
    });
  }

  handleFile = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let data = new FormData();
    data.append('files',this.state.file);
    axios.post(ROOT_URL +`/file/${this.state.course}`,data)
    .then((response)=>{
      this.componentDidMount();
    });
  }

  render() {

    var redirectVar = null;
    if(!localStorage.getItem('token')){
        redirectVar = <Redirect to="/" />
        return redirectVar;        
    }  
    let files = [];
    Object.assign(files,this.state.file);
    const isFaculty = localStorage.getItem('userType') === "faculty";

    return (
      <div>
        
        <div className="pageContent" style = {{marginLeft : 300}}>
          <div className="row">
          
            <div className="col-9 coursecolumn">
              <h3>Files</h3><br />
              <h4> Click on the file to download</h4>
              {files.map((file,index)=>{
                return <div key={index} className="filelist" ><a href={ROOT_URL + `/uploads/pics/${file.fpath}`} download target="_blank" rel="noopener noreferrer" >{file.fname}</a> </div>
              })}
              {(isFaculty)
              ?<form onSubmit={this.handleSubmit}>
                <input type='file' onChange={this.handleFile} required/>
                <button type='submit' className="btn btn-primary" >Upload File here</button>
              </form>
              :null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


