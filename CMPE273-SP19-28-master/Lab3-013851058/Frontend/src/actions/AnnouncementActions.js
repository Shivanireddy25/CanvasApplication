import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const ADD_ANNOUNCEMENTS = "ADD_ANNOUNCEMENTS";
export const GET_ANNOUNCEMENTS = "GET_ANNOUNCEMENTS";



export function getAnnouncements(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/announcements`,  
     values, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_ANNOUNCEMENTS,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function addAnnouncement(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/createannouncements`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: ADD_ANNOUNCEMENTS,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }