var connection =  new require('./kafka/Connection');

//topics files
var Signup = require('./services/signUp');
var Login = require('./services/login');
var CreateCourse = require('./services/createCourse');
var GetCourses = require('./services/getCourses');
var SearchCourses = require('./services/searchCourse');
var GetCourse = require('./services/getCourse');
var EnrollCourse = require('./services/enrollCourse');
var GetProfile = require('./services/getProfile');
var UpdateProfile = require('./services/updateProfile');
var CreateAnnouncements = require('./services/createAnnouncements');
var GetAnnouncements = require('./services/getAnnouncements');
var GetAssignments = require('./services/getAssignments');
var CreateAssignments = require('./services/createAssignment');
var GetPeople = require('./services/getPeople');
var CreateQuiz = require('./services/createQuiz');
var GetQuizs = require('./services/getQuizs');
var getQuizContent = require('./services/getQuizContent');
var GetAssignment = require('./services/getAssignment');
var CreateSubmissions = require('./services/createSubmissions');
var GetSubmissions = require('./services/getSubmissions');
var GetSubmission = require('./services/getSubmission');
var GetAllSubmissions = require('./services/getAllSubmissions');
var CreateGrade = require('./services/createGrade');
var CreateConvo = require('./services/createConversation');
var GetConvo = require('./services/getConversation');
var GetMessage = require('./services/getMessage');
var CreateMessage = require('./services/createMessage');
var GetGrade = require('./services/getGrade');
var waitList = require('./services/waitListCourse');
var enrollStudent = require('./services/enrollStudent');
var removeStudent = require('./services/removeStudent');
var GetAllPeople = require('./services/getAllPeople');
var SearchPeople = require('./services/searchPeople');
var PaginateCourses = require('./services/paginateCourses');
var PaginatePeople = require('./services/paginatePeople');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("signup", Signup);
handleTopicRequest("loginPage", Login);
handleTopicRequest("createCourse", CreateCourse);
handleTopicRequest("getCourses", GetCourses);
handleTopicRequest("createConversation",CreateConvo);
handleTopicRequest("getConversation",GetConvo);
handleTopicRequest("getMessage", GetMessage);
handleTopicRequest("createMessage", CreateMessage);
handleTopicRequest("searchCourse", SearchCourses)
handleTopicRequest("getCourse", GetCourse);
handleTopicRequest("enrollCourse", EnrollCourse);
handleTopicRequest("getProfile", GetProfile);
handleTopicRequest("updateProfile", UpdateProfile);
handleTopicRequest("createAnnouncements", CreateAnnouncements);
handleTopicRequest("getAnnouncements", GetAnnouncements);
handleTopicRequest("getAssignments", GetAssignments);
handleTopicRequest("createAssignment", CreateAssignments);
handleTopicRequest("getPeople", GetPeople);
handleTopicRequest("createQuiz", CreateQuiz);
handleTopicRequest("getQuizs", GetQuizs);
handleTopicRequest("getQuizContent", getQuizContent);
handleTopicRequest("getAssignment", GetAssignment);
handleTopicRequest("createSubmissions", CreateSubmissions);
handleTopicRequest("getSubmissions", GetSubmissions);
handleTopicRequest("getSubmission", GetSubmission);
handleTopicRequest("getAllSubmissions", GetAllSubmissions);
handleTopicRequest("createGrade", CreateGrade);
handleTopicRequest("getConversation",GetConvo); 
handleTopicRequest("getGrade", GetGrade);
handleTopicRequest("waitListCourse", waitList);
handleTopicRequest("removeStudent", removeStudent);
handleTopicRequest("enrollStudent", enrollStudent);
handleTopicRequest("getAllPeople", GetAllPeople);
handleTopicRequest("searchPeople", SearchPeople);
handleTopicRequest("paginateCourse", PaginateCourses);
handleTopicRequest("paginatePeople", PaginatePeople); 