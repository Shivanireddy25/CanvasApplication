import axios from "axios";
import {ROOT_URL} from '../URLSettings';
export const LOGIN_USER = "LOGIN";
export const SIGN_UP = "SIGN_UP";

export function loginUser(values, callback) {
   
const request = axios
      .post(`${ROOT_URL}/signIn`, values);
      return (dispatch) =>
    {
     request.then( (res) => {
             console.log("In login response is : " + JSON.stringify(res));
             dispatch(
                 {
                     type: LOGIN_USER,
                     payload: res.data
                 });
             callback(res);
         }
     );
 
    };
  }

  export function signUpUser(values, callback) {
   
    const request = axios
          .post(`${ROOT_URL}/signUp`, values);
          return (dispatch) =>
        {
         request.then( (res) => {
                 console.log("In Signup response is : " + JSON.stringify(res));
                 dispatch(
                     {
                         type: SIGN_UP,
                         payload: res.data
                     });
                 callback(res);
             }
         );
     
        };
      }
  