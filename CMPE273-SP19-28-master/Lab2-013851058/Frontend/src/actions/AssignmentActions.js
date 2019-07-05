import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const ADD_ASSIGNMENTS = "ADD_ASSIGNMENTS";
export const GET_ASSIGNMENTS = "GET_ASSIGNMENTS";
export const GET_ASSIGNMENT = "GET_ASSIGNMENT";
export const SUBMIT_ASSGN = "SUBMIT_ASSGN";
export const GET_SUB_FOR_ASSGN = "GET_SUB_FOR_ASSGN";
export const GET_ALL_SUB = "GET_ALL_SUB";




export function getAssignments(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/assignments`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_ASSIGNMENTS,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function submitAssignments(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/createSubmission`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: SUBMIT_ASSGN,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }

  export function addAssignment(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/createAssignments`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: ADD_ASSIGNMENTS,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }


      export function getAssignment(values, callback) {
        var id = values;
        const request = axios
              .get(`${ROOT_URL}/assignments/${id}`,   {
                headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
            });
              return (dispatch) =>
            {
             request.then( (res) => {
                     
                     dispatch(
                         {
                             type: GET_ASSIGNMENT,
                             payload: res.data
                         });
                     callback(res);
                 }
             );
         
            };
          }

          export function getSubmissionForAssign(values, callback) {
            var id = values;
            const request = axios
                  .get(`${ROOT_URL}/submissions/${id}`,   {
                    headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
                });
                  return (dispatch) =>
                {
                 request.then( (res) => {
                         
                         dispatch(
                             {
                                 type: GET_SUB_FOR_ASSGN,
                                 payload: res.data
                             });
                         callback(res);
                     }
                 );
             
                };
              }


              export function getAllSubmissions(values, callback) {
                var id = values;
                
                const request = axios
                      .get(`${ROOT_URL}/submissionsAll/${id}`,   {
                        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
                    });
                      return (dispatch) =>
                    {
                     request.then( (res) => {
                             
                             dispatch(
                                 {
                                     type: GET_ALL_SUB,
                                     payload: res.data
                                 });
                             callback(res);
                         }
                     );
                 
                    };
                  }