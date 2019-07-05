import {GET_USER_COURSES, CREATE_COURSE, WAITLIST_COURSE, GET_COURSE, ENROLL_COURSE} from '../actions/CourseAction';


export default function(state, action)
{
   switch(action.type)
   {
       case GET_USER_COURSES:
           return action.payload;
       case CREATE_COURSE:
           return action.payload;
        case WAITLIST_COURSE:
         return action.payload;
         case GET_COURSE:
         return action.payload;
         case ENROLL_COURSE:
         return action.payload;
       default:
           return {...state};
   }
}