import {ADD_ANNOUNCEMENTS} from '../actions/AnnouncementActions';
import {GET_ANNOUNCEMENTS} from '../actions/AnnouncementActions';

export default function(state, action)
{
   switch(action.type)
   {
       case ADD_ANNOUNCEMENTS:
           return action.payload;
       case GET_ANNOUNCEMENTS:
           return action.payload;
       default:
           return {...state};
   }
}