import { gql } from 'apollo-boost';


const login = gql`
query login($name: String, $password: String){
        login(name: $name, password: $password){
            result
            userData{
                name
                email
                password
                about
                country
              city
              gender
              
              hometown
              school
              company
              languages
              phoneNumber
              userType
              }
        }
    }`

const profile = gql`
    query profile($name: String){
        profile(name: $name){
                name
                email
                password
                about
                country
                city
               gender
               hometown
               school
               company
               languages
               phoneNumber
               userType
        }
    }
`

var userCourses = gql`
    query userCourses($name: String){
        userCourses(name : $name){
            result
            courseDetails{
         CourseId
         CourseName
         CourseDescription
         CourseRoom
         CourseCapacity
         courseTerm
         createdBy
         name
            }
        }
    }
`



const searchCourse = gql`
query searchCourse($name: String, $userType : String, $id : String ){
        searchCourse(name: $name, userType : $userType, id : $id){
            result
            courseDetails{
                CourseId
                CourseName
                CourseDescription
                CourseRoom
                CourseCapacity
                courseTerm
                createdBy
                name
                   }
        }
    }`


    var getSpecificCourse = gql`
    query getSpecificCourse($id: String){
        getSpecificCourse(CourseId : $id){
            result
            courseDetails{
         CourseId
         CourseName
         CourseDescription
         CourseRoom
         CourseCapacity
         courseTerm
         createdBy
         name
            }
        }
    }
`


export {login, profile, userCourses, searchCourse, getSpecificCourse};











