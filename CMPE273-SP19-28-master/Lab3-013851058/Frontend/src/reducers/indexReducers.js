import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginReducer  from "./loginReducer";
import profileReducer from "./profileReducer";
import courseReducer from "./CourseReducer";
import announceReducer from "./AnnouncementReducer";
import assignReducer from "./AssignmentReducer";
import quizReducer from "./QuizReducer";
import gradeReducer from "./GradeReducer";
import messageReducer from "./MessagingReducer";


const rootReducer = combineReducers({
   login : loginReducer,
   profile : profileReducer,
   course : courseReducer,
   announcements : announceReducer,
   assignments : assignReducer,
   quiz : quizReducer,
   grades : gradeReducer,
   message : messageReducer
   
});

export default rootReducer;