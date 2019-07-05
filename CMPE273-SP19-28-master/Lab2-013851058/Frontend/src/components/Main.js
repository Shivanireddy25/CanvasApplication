import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import Home from './Home/Home';
import signUp from './signUp/signUp';
import courses from './Courses/Courses';
import profile from '../components/Profile/profile';
import announcements from './Student/StudentAnnouncements';
import Facannouncements from './Faculty/FacultyAnnouncements';
import assignments from './Student/StudAssignments';
import Facassignments from './Faculty/faculAssignment';
import FacultyCourses from './Courses/FacultyCourses';
import CourseSection from './Courses/CourseSection';
import HomeCourses from './Home/HomeWithCourses';
import addCourse from './Faculty/AddCourse';
import addAnnouncements from './Faculty/AddAnnouncement';
import addAssignments from './Faculty/AddAssignment';
import people from './Student/People';
import students from './Faculty/People';
import StudentGrade from './Student/StudentGrade';
import StudentQuiz from './Student/StudentQuiz';
import FacultyQuiz from './Faculty/FacultyQuiz';
import AddQuiz from './Faculty/AddQuiz';
import TakeQuiz  from './Student/TakeQuiz';
import QuizSubmission from './Student/QuizSubmission';
import CourseHome from './Courses/CourseHome';
import SearchCourse from './Student/SearchCourse';

import ViewAssignment from './Student/ViewAssignment';
import EnrollCourse from './Student/EnrollCourse';
import DeleteCourse from './Student/DeleteCourse';

import { ProfileUpdated } from './Student/ProfileUpdated';
import submitAssignment from './Student/SubmitAssignment';
import ViewSubmission from './Faculty/ViewSubmissions';
import Dashboard from './Faculty/Dashboard';
import Messages from './Faculty/Messages';
import Conversation from './Student/Conversation';
import SubmitGrades from './Faculty/SubmitGrades';
import Files from './Student/File';
import waitListCourse from './Student/WaitlistCourse';
import People from './Profile/PeopleSearch';



//Create a Main Component
class Main extends Component {
    render(){
        return(
            <BrowserRouter>
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/"  exact component={LoginPage}/> 
                <Route path="/home" component={Home}/>
                <Route path="/home/courses" component={HomeCourses}/>
                <Route path="/home/dashboard" component= {Dashboard}/>
                <Route path="/signUp" component={signUp}></Route>
               
               
                <Route path="/student/Courses" component={courses}></Route>
               
                {/* Announcements */}
                <Route path="/home/student/Courses/announcements" component={announcements}></Route>
                <Route path="/home/faculty/Courses/announcements" component={Facannouncements}></Route>
                <Route path="/home/faculty/Courses/addAnnouncements" component={addAnnouncements}></Route>
             

                <Route path="/home/student/Courses/assignments" component={assignments}></Route>
                <Route path="/home/faculty/Courses/assignments" component={Facassignments}></Route>
                <Route path="/home/faculty/Courses/addAssignment" component={addAssignments}></Route>
                <Route path="/home/searchCourse/" component={SearchCourse}></Route>

                
                <Route path="/home/CourseSection" component={CourseSection}></Route>

                {/*Course Details */}
                <Route path="/home/student/Courses" component={courses}></Route>
                <Route path="/home/faculty/Courses" component={FacultyCourses}></Route>

                <Route path="/home/profile" component={profile}></Route>
                <Route path="/home/People" component={People}></Route>
                <Route path="/home/AddCourse" component={addCourse}></Route>
                <Route path="/home/student/Courses/people" component={people}></Route>
                <Route path="/home/faculty/Courses/people" component={students}></Route>

                <Route path="/home/faculty/Courses/files" component={Files}></Route>
                <Route path="/home/student/Courses/files" component={Files}></Route>
                

                <Route path="/home/student/Courses/grades" component={StudentGrade}></Route>
                <Route path="/home/student/Courses/quizs" component={StudentQuiz}></Route>
                <Route path="/home/faculty/Courses/quiz" component={FacultyQuiz}></Route>
                <Route path="/home/faculty/Courses/submission" component={ViewSubmission}></Route>
                <Route path="/home/student/Courses/quizSubmitted" component={QuizSubmission}></Route>
                <Route path="/home/student/Courses/quiz/:id" component={TakeQuiz}></Route>
                <Route path="/home/student/Courses/home" component={CourseHome}></Route>
                <Route path="/home/faculty/Courses/home" component={CourseHome}></Route>
                <Route path="/home/enrollCourse/:id" component={EnrollCourse}></Route>
                <Route path="/home/waitListCourse/:id" component={waitListCourse}></Route>
                <Route path="/home/deleteCourse/:id" component={DeleteCourse}></Route>

                <Route exact path= "/home/faculty/Courses/grades/:id/:id1" component= {SubmitGrades}></Route>
               

                <Route path="/home/student/Courses/assignment/:id" component={ViewAssignment}></Route>
                <Route path="/home/student/Courses/submissions/:id" component={submitAssignment}></Route>
                <Route path="/home/faculty/Courses/assignment/:id" component={ViewAssignment}></Route>
                
                

                <Route path="/home/faculty/Courses/addquiz" component={AddQuiz}></Route>
                <Route path="/home/profileUpdated" component={ProfileUpdated}></Route>
                <Route path="home/faculty/Courses/remove" component={ProfileUpdated}></Route>

               
                
                <Route exact path="/home/Messages" component={Messages}></Route>
                <Route path="/home/messages/:id/:sub" component={Conversation} />
                  
            </div>
            </BrowserRouter>
        )
    }
}
//Export The Main Component
export default Main;