import {GET_GRADE} from '../actions/GradeActions';
import {GIVE_GRADE} from '../actions/GradeActions';

export default function(state, action)
{
   switch(action.type)
   {
       case GET_GRADE:
           return action.payload;
       case GIVE_GRADE:
           return action.payload;
       default:
           return {...state};
   }
}