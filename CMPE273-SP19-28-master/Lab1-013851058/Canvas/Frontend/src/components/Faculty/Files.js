


import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import CourseSection from '../Courses/CourseSection';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


export default class FacultyFiles extends Component {

    constructor(){
        super();
        this.state = {  
            name : localStorage.getItem('name'),
            userType : localStorage.getItem('userType'),
            people : [],
            courseId : localStorage.getItem('course'),
            file : null
        }
    }  

    
   
    componentDidMount(){
       
    }

    handleselectedFile(e) {
       let files = e.target.files;
       let reader = new FileReader();
       this.setState(
           {file : files[0]}
       )
       console.log(files[0]);
      
      }

      handleUpload(e){
          let file = this.state.file;
          let formData = new FormData();
          console.log(file);
          formData.append('image', file);
          formData.append('name', "Shivani");
          for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
          axios.post("http://localhost:9000/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res =>
            {
                console.log("Suuccedd")
            })
      }

render()
{ 
    var redirectVar = null;
    if(!cookie.load('cookie')){
      console.log("Still in home");
      redirectVar = <Redirect to= "/" />
      return redirectVar;
  } 
        
        return (
            <div className="Files" >
             <h3 style = {{ marginLeft : 300}}> Upload Lecture Notes or Files here </h3>

             <h4 style = {{ marginLeft : 300}}> Lecture Notes and Files Available : </h4>

             <a href = "/" style = {{ marginLeft : 300}}> CMPE 273 Lab 1.pdf</a> 
                <div>

                </div>
              <input type="file" name="" id="" style = {{ marginLeft : 300}} onChange={(e)=>this.handleselectedFile(e)} />
              <br/>
              <button type ="button" style = {{ marginLeft : 300}} onClick = {(e) => this.handleUpload(e)}> Upload File</button>
              <div> {Math.round(this.state.loaded,2) } %</div>
              <p> </p>

            </div>
          )
    
    
  }
} 
