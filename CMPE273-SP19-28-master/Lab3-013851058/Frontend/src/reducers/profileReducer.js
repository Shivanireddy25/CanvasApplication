import {GET_PROFILE} from '../actions/profileAction';
import {UPDATE_PROFILE} from '../actions/profileAction';

export default function(state, action)
{
   switch(action.type)
   {
       case GET_PROFILE:
           return action.payload;
       case UPDATE_PROFILE:
           return action.payload;
       default:
           return {...state};
   }
}