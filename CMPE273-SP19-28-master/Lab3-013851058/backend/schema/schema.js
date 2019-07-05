const graphql = require('graphql');
//const _ = require('lodash');
var User = require('../model/User');
var bcrypt = require('bcrypt-nodejs');
var Courses = require('../model/Courses');
//var Announcements = require('../model/Announcements');
var mongoose = require("../mongoose.js");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;



const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
     
  // course :  Array,
  // messages : Array,
   //grades : Array


        name: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        
        email: {
            type: GraphQLString
        },
        about: {
            type: GraphQLString
        },
        country: {
            type: GraphQLString
        },
        city: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        },
        hometown: {
            type: GraphQLString
        },
        school: {
            type: GraphQLString
        },
        company: {
            type: GraphQLString
        },
        languages: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        userType: {
            type: GraphQLString
        }
    })
});

const Course = new GraphQLObjectType({
    name : 'Course',
    fields : ()=>({
   
      

       CourseId : {type: GraphQLString},
       CourseName : {type: GraphQLString},
       CourseDept : {type: GraphQLString},
       CourseDescription : {type: GraphQLString},
       CourseRoom :{type: GraphQLString},
       CourseCapacity : {type: GraphQLString},
       WaitlistCapacity : {type: GraphQLString},
       courseTerm : {type: GraphQLString},
       createdBy :{type: GraphQLString},
       CurrentStrength : {type: GraphQLString},
       Status : {type: GraphQLString},
       name : {type: GraphQLString}
    
})
});

 // announcements : [],
        //assignments : [],
       // files : [{
       //    fname: "String",
        //   fpath: "String"
      // }]

const loginResult = new GraphQLObjectType({
    name: 'loginResult',
    fields: () => ({
        result: { type: GraphQLBoolean },
        userData: { type: ProfileType }
    })
});

const signupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
       success: { type: GraphQLBoolean },
      duplicateUser: { type: GraphQLBoolean }
    })
});


const createCourseResult = new GraphQLObjectType({
    name : 'createCourseResult',
    fields: ()=>({
        success : {type: GraphQLBoolean}
    })
});

const getCourseResult = new GraphQLObjectType({
    name : 'getCourseResult',
    fields: ()=>({
        result: { type: GraphQLBoolean },
        courseDetails: { type: new GraphQLList(Course) }
    })
});

const searchCourseResult = new GraphQLObjectType({
    name : 'searchCourseResult',
    fields: ()=>({
        result: { type: GraphQLBoolean },
        courseDetails: { type: new GraphQLList(Course) }
    })
});

const specificCourseResult = new GraphQLObjectType({
    name : 'specificCourseResult',
    fields: ()=>({
        result: { type: GraphQLBoolean },
        courseDetails: { type: new GraphQLList(Course) }
    })
});








const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        login: {
            type: loginResult,
            args: {
                name: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                }
            },
            async resolve(parent, args) {
                console.log("Checking args");
                console.log('args: ', args);
                var isAuthenticated = false;
                var profileData = {};

               await User.findOne({
               
                'name': args.name
                }, (err, user) => {
            
                    if (err) {
                        console.log("Unable to login.", err);
                        //callback(err, null);
                        isAuthenticated = false;
                    }
                    else {
            
                        if(user){
                            console.log("User details ", user);
                            console.log(args.password);
                            console.log(user.password);
                            if (!bcrypt.compareSync(args.password, user.password)) {                
                                console.log('Invalid Credentials!');
                                isAuthenticated = false;
                                //callback(null, null);                
                            }
                            else {
                            
                                console.log('Corect creds!')
                                isAuthenticated = true;

                                profileData = user
                                //callback(null, user);
                            }
                        }
                        else{
                           // callback(null, null);
                        }     
                    }
                });


                console.log('isauth', isAuthenticated);
                console.log('Profile Data', profileData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        userData: profileData
                    }
                    console.log('UserData', result.userData);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
            }
        },


        profile:{
            type: ProfileType,
            args: {
                name : {
                    type: GraphQLString
                }
            },
            
            async resolve(parent, args){
                console.log('args: ', args);
                var profileData = {};
                await User.findOne({
                    "name" : args.name
                }, (err, user)=>{
                    if(err){
                    }
                    else{
                        console.log('User details: ', user);
                        profileData = user;
                    }
                });

                return profileData;
            }
        },

        
        userCourses:{
            type: getCourseResult,
            args: {
                name : {
                    type: GraphQLString
                }
            
            },
           
             async resolve(parent, args){
                console.log('args: ', args);
              //  var courseDetails = {};


              var isAuthenticated = false;
              var courseData = {};

             await Courses.find( { $and: [{"name" : args.name }, { $or: [ { "Status": "ENROLLED" }, { "Status" : "CREATED"} ] }]}, function (err, course) {
                    if (err) {
                        
                    }
                    else {
                        console.log(course);
                        isAuthenticated = true;

                        courseData = course
                      //  callback(null, course);
                       // courseDetails = course;
                    }
                   
                });

               // console.log('isauth', isAuthenticated);
                console.log('Courses detail', courseData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        courseDetails: courseData
                    }
                    console.log('Courses Detail', result.userCourses);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result


              

               
            }
        },


        searchCourse:{
            type: searchCourseResult,
            args: {
                name : {
                    type: GraphQLString
                },
                userType : {
                    type: GraphQLString
                },
                id : {
                    type: GraphQLString
                }
            
            },
           
             async resolve(parent, args){
                console.log('args: ', args);
              //  var courseDetails = {};


              var isAuthenticated = false;
              var courseData = {};

             await Courses.find( {  "CourseId" :  new RegExp(args.id),
             Status : "CREATED"}, function (err, course) {
                    if (err) {
                        
                    }
                    else {
                        console.log(course);
                        isAuthenticated = true;

                        courseData = course
                      //  callback(null, course);
                       // courseDetails = course;
                    }
                   
                });

               // console.log('isauth', isAuthenticated);
                console.log('Courses detail', courseData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        courseDetails: courseData
                    }
                    console.log('Courses Detail', result.userCourses);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
               
            }
        },


        getSpecificCourse:{
            type: specificCourseResult,
            args: {
                CourseId : {
                    type: GraphQLString
                }      
            
            },
           
             async resolve(parent, args){
                console.log('args: ', args);
              //  var courseDetails = {};


              var isAuthenticated = false;
              var courseData = {};

             await Courses.find( { CourseId : args.CourseId}, function (err, course) {
                    if (err) {
                        
                    }
                    else {
                        console.log(course);
                        isAuthenticated = true;

                        courseData = course
                      //  callback(null, course);
                       // courseDetails = course;
                    }
                   
                });

               // console.log('isauth', isAuthenticated);
                console.log('Courses detail', courseData);
                if (isAuthenticated == true) {
                    var result = {
                        result: true,
                        courseDetails: courseData
                    }
                    console.log('Courses Detail', result.userCourses);
                }
                else {
                    var result = {
                        result: false
                    }
                }
                return result
               
            }
        }





       
    })
});

const updateProfileResult = new GraphQLObjectType({
    name: 'updateProfileResult',
    fields:()=>({
        success: {type:GraphQLBoolean}
    })
})






const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signup: {
            type: signupResult,
            args: {
                name: {
                    type: GraphQLString
                },
               
                email: {
                    type: GraphQLString
                },
                password: {
                    type: GraphQLString
                },
                userType: {
                    type: GraphQLString
                }
            },


                resolve: (parent, args) => {
                    return new Promise(async (resolve, reject) => {
                        var successResult = false;
                    var duplicateUserResult = false;
                        await User.findOne({
                            "name": args.name
                        }, (err, user) => {
                            if (err) {
    
                            }
                            else {
                                if (user) {
                                    console.log('User Exists!', user);
                                    if (args.userType === user.userType) {
                                        console.log('Duplicate user');
                                        duplicateUserResult = true;
                                        
                                        var resultData = {
                                            success: successResult,
                                            duplicateUser: duplicateUserResult
                                        }
                                        resolve(resultData);
    
                                    }
                                    else {
                                
                                        user.save().then(async (doc) => {
    
                                            console.log("User saved successfully.", doc);
                                            //callback(null, doc);
                                            successResult = true;
    
                                            var resultData = {
                                                success: successResult,
                                                duplicateUser: duplicateUserResult
                                            }
                                            resolve(resultData);
    
                                        });
    
                                    }
    
                                }
                                else {

                                    console.log("user not exists")
                                    var p = bcrypt.hashSync(args.password, bcrypt.genSaltSync(8), null);
                                    var user = new User({
                                        name : args.name,
                                        email : args.email,
                                        password : p,
                                        userType : args.userType
                                    });
                                    console.log('Use saving..');
                                    user.save().then((doc) => {
                                        console.log("User saved successfully.", doc);
                                        successResult = true;
                                        console.log('EOF');
                                        var resultData = {
                                            success: successResult,
                                            duplicateUser: duplicateUserResult
                                        }
                                    resolve(resultData);
                                    });
    
                                }
                                
                            }
                        });
                    });
                }
                               
        },


        updateProfile: {
            type: updateProfileResult,
            args: {
                name: {
                    type: GraphQLString
                },
                email: {
                    type: GraphQLString
                },
                about: {
                    type: GraphQLString
                },
                country: {
                    type: GraphQLString
                },
                city: {
                    type: GraphQLString
                },
                gender: {
                    type: GraphQLString
                },
                hometown: {
                    type: GraphQLString
                },
                school: {
                    type: GraphQLString
                },
                company: {
                    type: GraphQLString
                },
                languages: {
                    type: GraphQLString
                },
                phoneNumber: {
                    type: GraphQLString
                }    
            },

        resolve: (parent, args) => {
            console.log(args);
             User.findOne({
                'name': args.name
            }, (err, user) => {
        
                if (err) {
                    console.log("Unable to fetch user details.", err);
                    callback(err, null);
                }
                else {
                    console.log('Userdetails', user);

             user.name = args.name;
            user.email = args.email;
            user.phoneNumber = args.phoneNumber;
            user.about = args.about;
            user.city = args.city;
            user.country = args.country;
            user.company = args.company; 
            user.school = args.school;
            user.hometown = args.hometown;
            user.languages = args.languages;
            user.gender = args.gender;
                    user.save().then((doc) => {
        
                        console.log("User details saved successfully.", doc);
                        //callback(null, doc);
        
                    }, (err) => {
                        console.log("Unable to save user details.", err);
                        callback(err, null);
                    });
                }
            });
        
            var resultData = {
                success: true
            }
        
            return resultData;
        }
        } ,



        createCourse: {
            type: createCourseResult,
            args: {
                CourseId : {type: GraphQLString},
                CourseName : {type: GraphQLString},
                CourseDept : {type: GraphQLString},
                CourseDescription : {type: GraphQLString},
                CourseRoom :{type: GraphQLString},
                CourseCapacity : {type: GraphQLString},
                WaitlistCapacity : {type: GraphQLString},
                courseTerm : {type: GraphQLString},
                createdBy :{type: GraphQLString},
                CurrentStrength : {type: GraphQLString},
                Status : {type: GraphQLString},
                name : {type: GraphQLString}
            },
            resolve: (parent, args) => {
                console.log(args);
                //var success = true;
                User.findOne({
                    name : args.name
                }, function (err, user) {
                    if (err) {
                        console.log("Unable to get user details.", err);
                        //callback(err, null);
                    }
                    else {
                    var courses  = {
                            CourseId:args.CourseId,
                            CourseName:args.CourseName,
                            CourseDept:args.CourseDept,
                            CourseDescription : args.CourseDescription,
                            CourseRoom : args.CourseRoom,
                            CourseCapacity : args.CourseCapacity,
                            WaitlistCapacity : args.WaitlistCapacity,
                            courseTerm : args.courseTerm,
                            createdBy : args.createdBy, 
                            CurrentStrength : args.CurrentStrength,
                            Status : "CREATED",
                            name : args.name
                        };
                       user.course = user.course || [];
                       user.course.push(courses);
        
                       
                        user.save().then((doc) => {
        
                            console.log("Course saved successfully.", doc);
        
        
                        }, (err) => {
                            console.log("Unable to add Course", err);
                            callback(err, null);
                        }); 
                    }
                });


                var new_course = new Courses({
                    CourseId:args.CourseId,
                    CourseName:args.CourseName,
                    CourseDept:args.CourseDept,
                    CourseDescription : args.CourseDescription,
                    CourseRoom : args.CourseRoom,
                    CourseCapacity : args.CourseCapacity,
                    WaitlistCapacity : args.WaitlistCapacity,
                    courseTerm : args.courseTerm,
                    createdBy : args.createdBy, 
                    CurrentStrength : args.CurrentStrength,
                    Status : "CREATED",
                    name : args.name
                })
              
        
                new_course.save().then((doc) => {
        
                    console.log("Course added successfully.", doc);
                   
        
                }, (err) => {
                    console.log("Unable to add course.", err);
                   
                }); 
           var courseCreation = {
                    success : true
                }
                return courseCreation;

            }
        },


        enrollCourse: {
            type: createCourseResult,
            args: {
                CourseId : {type: GraphQLString},
                CourseName : {type: GraphQLString},
                CourseDept : {type: GraphQLString},
                CourseDescription : {type: GraphQLString},
                CourseRoom :{type: GraphQLString},
                CourseCapacity : {type: GraphQLString},
                WaitlistCapacity : {type: GraphQLString},
                courseTerm : {type: GraphQLString},
                createdBy :{type: GraphQLString},
                CurrentStrength : {type: GraphQLString},
                Status : {type: GraphQLString},
                name : {type: GraphQLString}
            },
            resolve: (parent, args) => {
                console.log("ARGS" + args);
                //var success = true;

                Courses.findOne({
                    CourseId : args.CourseId
                }, function(err, c) {
                    if (err) {
                        console.log("Error", err);
                        
                    } else {
                        console.log('Course', c);
                        User.findOne({
                            name : args.name
                        }, function(err, user) {
                            if (err) {
                                console.log("Error", err);
                                
                            }  else {
                                user.course = user.course || [];
                                user.course.push(c);
                                user.save().then((doc) => {
                                   console.log("Course Added to user");
                                   callback(null, doc);
                                }, (err) => {
                                    console.log("Unsuccessful");
                                });
                            }
                        })
                    }
                })
               
                  
                           
            
                    var new_course = new Courses({
                        CourseId:args.CourseId,
                        CourseName:args.CourseName,
                        CourseDept:args.CourseDept,
                        CourseDescription : args.CourseDescription,
                        CourseRoom : args.CourseRoom,
                        CourseCapacity : args.CourseCapacity,
                        WaitlistCapacity : args.WaitlistCapacity,
                        courseTerm : args.courseTerm,
                        createdBy : args.createdBy, 
                        CurrentStrength : args.CurrentStrength,
                        Status : "ENROLLED",
                        name : args.name
                    })
                  
            
                    new_course.save().then((doc) => {
            
                        console.log("Course added successfully.", doc);
                      //  callback(null, doc);
            
                    }, (err) => {
                        console.log("Unable to ad course.", err);
                       // callback(err, null);
                    }); 
        



                

           var courseCreation = {
                    success : true
                }
                return courseCreation;

            }
        }



    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});







