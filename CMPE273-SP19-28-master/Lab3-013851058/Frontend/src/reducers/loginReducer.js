import {LOGIN_USER, SIGN_UP} from '../actions/loginAction';

export default function(state, action)
{
   switch(action.type)
   {
       case LOGIN_USER:
       case SIGN_UP:
           return action.payload;
       default:
           return {...state};
   }
}