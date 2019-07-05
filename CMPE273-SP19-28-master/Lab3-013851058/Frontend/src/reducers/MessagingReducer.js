import {GET_CONVO} from '../actions/MessagingActions';
import {CREATE_CONVO} from '../actions/MessagingActions';
import {GET_MESSAGE} from '../actions/MessagingActions';
import {CREATE_MESSAGE} from '../actions/MessagingActions';

export default function(state, action)
{
   switch(action.type)
   {
       case CREATE_MESSAGE:
           return action.payload;
       case CREATE_CONVO:
           return action.payload;
       case GET_MESSAGE:
           return action.payload;
       case GET_CONVO:
           return action.payload;
       default:
           return {...state};
   }
}