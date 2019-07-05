import {GET_QUIZ} from '../actions/QuizActions';
import {CREATE_QUIZ, GET_QUIZ_CONTENT} from '../actions/QuizActions';

export default function(state, action)
{
   switch(action.type)
   {
       case GET_QUIZ:
           return action.payload;
       case CREATE_QUIZ:
           return action.payload;
       case GET_QUIZ_CONTENT:
        return action.payload;
       default:
           return {...state};
   }
}