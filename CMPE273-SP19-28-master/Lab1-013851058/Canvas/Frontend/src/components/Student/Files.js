import React, {Component} from 'react';
import styles from '../Courses/course.css'; 
import axios from 'axios';
import CourseSection from '../Courses/CourseSection';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Document } from 'react-pdf'

import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
registerPlugin(FilePondPluginImagePreview);


export default class StudentFiles extends Component {

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

    handleDownload(e) {
      var imagePreviewArr = [];
      axios.post('http://localhost:9000/download-file/' + e.target.name)
                .then(response => {
                  let imagePreview = 'data:image/jpg;base64, ' + response.data;
                  imagePreviewArr.push(imagePreview);
                  console.log(imagePreviewArr);
                   
                })
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
          axios.post("http://localhost:9000/upload", {data : formData}).then(res =>
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
            <div>
                <form class="form-inline my-2 my-lg-0" style = {{ marginLeft : 400}}>
                <div>
               <h2> Files </h2>  <br />
               </div>
      <input class="form-control mr-sm-2" type="search" placeholder="Search File" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      
    </form>
             <nav id="navbar-example3" class="navbar navbar-light bg-light" style = {{width : 432, left :400}}>
  
  <nav class="nav nav-pills flex-column">
    <a class="nav-link" href="#item-1">Demos</a>
    <nav class="nav nav-pills flex-column">
      <a class="nav-link ml-3 my-1" href="#item-1-1"></a>
      <a class="nav-link ml-3 my-1" href="#item-1-2">CMPE 273 Lab1.pdf</a>
      <button name = "1.png" onClick = {this.handleDownload}> File Download </button>
      
      
      
     
    </nav>
   
  </nav>
</nav>


</div>
         
          )
    
    
  }
} 


