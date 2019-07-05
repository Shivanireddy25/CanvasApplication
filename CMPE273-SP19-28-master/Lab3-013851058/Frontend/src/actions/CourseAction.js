import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const GET_USER_COURSES = "GET_USER_COURSES";
export const CREATE_COURSE = "CREATE_COURSE";
export const WAITLIST_COURSE = "WAITLIST_COURSE";
export const GET_COURSE = "GET_COURSE";
export const ENROLL_COURSE = "ENROLL_COURSE";


export function getUserCourses(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/courses`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_USER_COURSES,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }


  export function getCourse(values, callback) {
    var id = values;
    console.log(id);
    const request = axios.get(ROOT_URL + `/getCourse/${id}`, {
      headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: GET_COURSE,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }




  export function createCourses(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/createCourse`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: CREATE_COURSE,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }

  export function waitlistCourse(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/waitListCourse`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: WAITLIST_COURSE,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      } 


      export function enrollCourse(values, callback) {
   
        const request = axios
              .post(`${ROOT_URL}/enrollCourse`,  
             values, {
                headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
            });
              return (dispatch) =>
            {
             request.then( (res) => {
                     
                     dispatch(
                         {
                             type: ENROLL_COURSE,
                             payload: res.data
                         });
                     callback(res);
                 }
             );
         
            };
          } 
    
  