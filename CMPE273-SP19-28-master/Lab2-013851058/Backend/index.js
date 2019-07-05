var queryHelper = require('./ConfigFiles/QueryGenerator');

//Installing  npm  modules
const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var util = require('util');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var kafka = require('./kafka/client');
var course = require('./model/Courses');
var user = require('./model/User');
var requireAuth = passport.authenticate('jwt', {session: false});


//Get a connection
var mongoose = require("./mongoose.js");


//Routes
const signUp = require('./routes/signUp');
const logIn = require('./routes/login');
const createCourse = require('./routes/createCourse');
const getCourse = require('./routes/getCourses');
const searchCourses = require('./routes/searchCourse');
const getSpecificCourse = require('./routes/getCourse');
const enrollCourse = require('./routes/enrollCourse');
const waitListCourse = require('./routes/waitlistCourse');
const getProfile = require('./routes/getProfile');
const updateProfile = require('./routes/updateProfile');
const createAnnouncements = require('./routes/createAnnouncements');
const getAnnouncements = require('./routes/getAnnouncements');
const createAssignment = require('./routes/createAssignment');
const getAssignment = require('./routes/getAssignments');
const getPeople = require('./routes/getPeople');
const createQuiz = require('./routes/createQuiz');
const getQuizs = require('./routes/getQuizs');
const getQuizContent = require('./routes/getQuizContent');
const getSpecificAssignment = require('./routes/getAssignment');
const createSubmission = require('./routes/createSubmissions');
const getSubmissions = require('./routes/getSubmissions');
const getSubmission = require('./routes/getSubmission');
const allSubmissions = require('./routes/getAllSubmissions');
const createConversation = require('./routes/createConversation');
const getConversation = require('./routes/getConversation');
const getMessage = require('./routes/getMessage');
const createMessage = require('./routes/createMessage');
const createGrade = require('./routes/createGrade');
const getGrade = require('./routes/getGrade');
const removeStudent = require('./routes/removeStudent');
const enrollStudent = require('./routes/enrollStudent');
const getAllPeople = require('./routes/getAllPeople');
const searchPeople = require('./routes/searchPeople');
const paginatePeople = require('./routes/paginatePeople');
const paginateCourse = require('./routes/PaginateCourses');


const app = express();
app.use(express.static(__dirname + '/')); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://18.220.118.8:3000', credentials: true }));


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(session({
    secret: 'Secured!!',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:60 * 60 * 1000}   
}));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://18.220.118.8:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//passport 
app.use(passport.initialize());
require('./ConfigFiles/passport')(passport);


app.use(signUp);
app.use(logIn);
app.use(createCourse);
app.use(getCourse);
app.use(searchCourses);
app.use(getSpecificCourse);
app.use(enrollCourse);
app.use(getProfile);
app.use(updateProfile);
app.use(createAnnouncements);
app.use(getAnnouncements);
app.use(getAssignment);
app.use(createAssignment);
app.use(getPeople);
app.use(createQuiz);
app.use(getQuizs);
app.use(getQuizContent);
app.use(getSpecificAssignment);
app.use(createSubmission);
app.use(getSubmissions);
app.use(getSubmission);
app.use(allSubmissions);
app.use(createConversation);
app.use(getConversation);
app.use(getMessage);
app.use(createMessage);
app.use(createGrade);
app.use(getGrade);
app.use(waitListCourse);
app.use(removeStudent);
app.use(enrollStudent);
app.use(getAllPeople);
app.use(searchPeople);
app.use(paginateCourse);
app.use(paginatePeople);



const fs = require('fs');

var filepath = "";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./uploads/pics`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
       
    },
    filename: function (req, file, cb) {
        filepath = file.originalname + Date.now() + path.extname(file.originalname)
        cb(null, filepath);
    }
});
var upload = multer({ storage: storage }); 

app.get("/file/:id", (req, res) => {
   
    course.findOne({ "CourseId": req.params.id }, (err, result) => {
        
        if (err) {
            
        }
        else {
            res.json(result.files);
        }
    });
});

app.post("/file/:id",upload.single('files'),(req,res)=>{
    
    console.log("uploading file");
    if(req.file){
        const files = {
            fname: req.file.originalname,
            fpath: filepath
        }
        course.findOneAndUpdate({ "CourseId": req.params.id }, { $push: { files } }, (err, result) => {
            if (err) {
               console.log("Not uploading")
            }
            else {
                console.log("Uploaded");
                res.json(result);
            }
        });
    }
   
});


const storagepic = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./uploads/profile`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
       
    },
   
    filename: (req, file, cb) => {

        const newFilename = `profile_${req.body.description}.jpg`;
        cb(null, newFilename);
    },
});

const uploadpic = multer({ storage : storagepic });

app.post('/addpic', uploadpic.single('selectedFile') , (req,res) => {
   
    res.send();});


app.post('/getprofilepic/:file(*)',(req, res) => {
    console.log("Inside get profile pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads/profile',file);
    if (fs.existsSync(fileLocation)) {
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(base64img);
    }
    else
    {
        res.end("");
    }

});


app.listen(9000, () => console.log('Started Canvas Server on 9000!'));





