import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const GET_QUIZ = "GET_QUIZ";
export const GET_QUIZ_CONTENT = "GET_QUIZ_CONTENT";
export const CREATE_QUIZ = "CREATE_QUIZ";



export function getQuiz(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/getQuiz`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_QUIZ,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }


  export function getQuizContent(values, callback) {
    var id = values;
    const request = axios
          .get(`${ROOT_URL}/getQuizContent/${id}`,   {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: GET_QUIZ_CONTENT,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }

  export function createQuiz(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/quiz`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: CREATE_QUIZ,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }
