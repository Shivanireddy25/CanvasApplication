import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const CREATE_CONVO = "CREATE_CONVO";
export const GET_CONVO = "GET_CONVO";
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";



export function getConvo(values, callback) {
   var from = values;

const request = axios
      .get(`${ROOT_URL}/conversations/${from}`,  
      {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    });
      return (dispatch) =>
    {
     request.then( (res) => {
             
             dispatch(
                 {
                     type: GET_CONVO,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function createConvo(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/conversations`,  
         values, {
            headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        });
          return (dispatch) =>
        {
         request.then( (res) => {
                 
                 dispatch(
                     {
                         type: CREATE_CONVO,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }


      export function createMessage(values, callback) {
   
        const request = axios
              .post(`${ROOT_URL}/messages`,  
             values, {
                headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
            });
              return (dispatch) =>
            {
             request.then( (res) => {
                     
                     dispatch(
                         {
                             type: CREATE_MESSAGE,
                             payload: res.data
                         });
                     callback(res);
                 }
             );
         
            };
          }


          export function getMessage(values, callback) {
            var ToUser = values.ToUser;
            var sub = values.sub;

            const request = axios
                  .get(`${ROOT_URL}/messages/${ToUser}/${sub}`,   {
                    headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
                });
                  return (dispatch) =>
                {
                 request.then( (res) => {
                         
                         dispatch(
                             {
                                 type: GET_MESSAGE,
                                 payload: res.data
                             });
                         callback(res);
                     }
                 );
             
                };
              }


