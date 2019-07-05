import { gql } from 'apollo-boost';

const signup = gql`
mutation Signup($name: String, $email: String, $password: String, $userType: String){
    signup(name: $name, email: $email, password: $password, userType: $userType){
        success  
        duplicateUser      
    }
}`

const updateProfile = gql`
    mutation updateProfile($name: String, $email: String, $about: String, $country: String, $city: String, $gender: String, $hometown: String, $school:String, $company: String, $languages: String, $phoneNumber: String){
        updateProfile(name:$name,email:$email, about:$about, country:$country, city: $city, gender:$gender, hometown: $hometown, school: $school, company:$company, languages: $languages, phoneNumber: $phoneNumber){
            success
        }
    }
    `

const createCourse = gql`
    
    mutation createCourse($CourseId: String, $CourseName: String, $CourseDept: String, $CourseDescription: String, $CourseRoom: String, $CourseCapacity: String, $WaitlistCapacity: String, $courseTerm: String, $createdBy:String, $CurrentStrength: String, $Status: String, $name: String){
        createCourse(CourseId: $CourseId, CourseName: $CourseName, CourseDept: $CourseDept, CourseDescription: $CourseDescription, CourseRoom: $CourseRoom, CourseCapacity: $CourseCapacity, WaitlistCapacity: $WaitlistCapacity, courseTerm: $courseTerm, createdBy:$createdBy, CurrentStrength: $CurrentStrength, Status: $Status, name: $name){
            success
        }
    }
    
`

const enrollCourse = gql`
    
    mutation enrollCourse($CourseId: String, $CourseName: String, $CourseDept: String, $CourseDescription: String, $CourseRoom: String, $CourseCapacity: String, $WaitlistCapacity: String, $courseTerm: String, $createdBy:String, $CurrentStrength: String, $Status: String, $name: String){
        enrollCourse(CourseId: $CourseId, CourseName: $CourseName, CourseDept: $CourseDept, CourseDescription: $CourseDescription, CourseRoom: $CourseRoom, CourseCapacity: $CourseCapacity, WaitlistCapacity: $WaitlistCapacity, courseTerm: $courseTerm, createdBy:$createdBy, CurrentStrength: $CurrentStrength, Status: $Status, name: $name){
            success
        }
    }
    
`

export {signup, updateProfile, createCourse, enrollCourse};