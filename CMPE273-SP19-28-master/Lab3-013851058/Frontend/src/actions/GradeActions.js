import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const GET_GRADE = "GET_GRADE";
export const GIVE_GRADE = "GIVE_GRADE";


export function getGrade(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/grades`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_GRADE,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function giveGrade(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/grade`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: GIVE_GRADE,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }

      