import {GET_ASSIGNMENTS, GET_ALL_SUB} from '../actions/AssignmentActions';
import {ADD_ASSIGNMENTS, GET_SUB_FOR_ASSGN, SUBMIT_ASSGN, GET_ASSIGNMENT} from '../actions/AssignmentActions';

export default function(state, action)
{
   switch(action.type)
   {
       case GET_ASSIGNMENTS:
           return action.payload;
       case ADD_ASSIGNMENTS:
           return action.payload;
           case SUBMIT_ASSGN:
           return action.payload;
           case GET_SUB_FOR_ASSGN:
           return action.payload;
  case GET_ASSIGNMENT:
  case GET_ALL_SUB:
return action.payload;
       default:
           return {...state};
   }
}