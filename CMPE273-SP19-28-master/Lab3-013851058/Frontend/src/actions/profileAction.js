import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const GET_PROFILE = "GET_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";


export function getProfile(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/profile`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_PROFILE,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function updateProfile(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/updateProfile`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: UPDATE_PROFILE,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }

  