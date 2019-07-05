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


const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("In multer",req.name);
		
		//Give the path where the file needs to be stored
        
		const dir = `./uploads/property`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
            console.log(file);
        const newFilename = `${file.originalname}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });




const app = express();
app.use(express.static(__dirname + '/')); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

// Add a User
app.post('/StudentSignIn', (req, res) => { 
    var data = Object.keys(req.body)[0];
    var parsedData = JSON.parse(data);
   
    
    /*var sql = util.format(
        'select * from profile u where u.name = "%s" and u.password = "%s" and userType = "student";',
        parsedData.name,
        parsedData.password
      );   */
      var sql = util.format(
        'select * from profile u where u.name = "%s"  and userType = "student";',
        parsedData.name,
      
      ); 

    
         
    queryHelper.executeQuery(sql, function(err, result){
        if(err){
            console.log("Error", err);
        }  else if(result.length === 0){
            console.log("Invalid login");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end();
        } else {
            console.log(result[0].password);
            console.log(bcrypt.compareSync(parsedData.password, result[0].password));
           if(bcrypt.compareSync(parsedData.password, result[0].password)) {
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result));
            console.log(result);
        }
        }       
    })   
})

app.post('/upload',upload.single('image'), (req, res) => {
    console.log("Inisde post file");

    console.log("Req Data : ",req.name);
	
	
	
    });
    
    app.post('/download-file/:file(*)', function(req, res){
        console.log('Inside DOwnload File');
        var file = req.params.file;
        var filelocation = path.join(__dirname + '/uploads', file);
        var img = fs.readFileSync(filelocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {
            'Content--type': 'image/jpg'
        });
        res.end(base64img);
    });

//Faculty signIn.
app.post('/FacultySignIn', (req, res) => {
    var data = Object.keys(req.body)[0];
    var parsedData = JSON.parse(data);
    /*var sql = util.format(
        'select * from profile u where u.name = "%s"  and u.password = "%s" and userType = "faculty";',
        parsedData.name,    
        parsedData.password
      ); */

      var sql = util.format(
        'select * from profile u where u.name = "%s"  and userType = "student";',
        parsedData.name,
      
      );  
     
    queryHelper.executeQuery(sql, function(err, result){
        if(err){
            console.log("Error", err);
        }  else if(result.length === 0){
            console.log("Invalid login");
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end();
        } else {
            console.log(bcrypt.compareSync(parsedData.password, result[0].password));
            if(bcrypt.compareSync(parsedData.password, result[0].password)) {
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result));
            console.log(result);
        }      
    } 
    })   
})

//Create course
app.post('/createCourse', (req, res) => {
    
    //entering record to user table
    console.log("Course Creation");
    var status = "CREATED";
    var sql = "INSERT INTO courses (CourseId, CourseName , CourseDept, CourseDescription, CourseRoom, CourseCapacity , Waitlistcapacity, courseTerm, createdBy, status, name)  values";
    sql += util.format("(%d,'%s', '%s', '%s','%s', %d, %d, '%s', '%s', '%s','%s')", req.body.CourseId, req.body.CourseName, req.body.CourseDept, req.body.CourseDescription,
    req.body.CourseRoom, req.body.CourseCapacity, req.body.Waitlistcapacity, req.body.courseTerm, req.body.createdBy, status, req.body.name);

       queryHelper.executeQuery(sql, function(result, err){
           if(err){
            
           } 
       }) 
       res.end("Course created");
})

app.post('/enrollCourse', (req, res) => {
    
    //entering record to user table
    console.log("Course Creation");
    var status = "ENROLLED";
    var sql = "INSERT INTO courses (CourseId, CourseName , CourseDept, CourseDescription, CourseRoom, CourseCapacity , Waitlistcapacity, courseTerm, createdBy, status, name)  values";
    sql += util.format("(%d,'%s', '%s', '%s','%s', %d, %d, '%s', '%s', '%s','%s')", req.body.CourseId, req.body.CourseName, req.body.CourseDept, req.body.CourseDescription,
    req.body.CourseRoom, req.body.CourseCapacity, req.body.Waitlistcapacity, req.body.courseTerm, req.body.createdBy, status, req.body.name);
    console.log(sql);
       queryHelper.executeQuery(sql, function(result, err){
           if(err){
            
           } 
       }) 
       res.end("Course created");
})

//Get all courses
app.post('/courses', (req, res) => {
    console.log(req.body.name);
    if(req.body.userType === 'faculty') {
    var sql = util.format(
        'select * from courses  where name = "%s" and createdBy = "faculty";',
        req.body.name
      );
    }
    else {
     /* var sql = util.format('select * from courses where name = "%s" and status = "ENROLLED";',
     req.body.name); */
     var sql = util.format(
        'select * from courses  where name = "%s" and createdBy = "student";',
        req.body.name
      );
    }
     queryHelper.executeQuery(sql, function(err, result){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        
        res.end(JSON.stringify(result));
     })
    
     
     
   
})

app.get('/coursesOnly', (req, res) => {
   
    var sql = 
        'select * from courses where  CourseName like "%27%";';
    
    
     queryHelper.executeQuery(sql, function(err, result){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        
        res.end(JSON.stringify(result));
     })
     
     
   
})


app.post('/coursesList', (req, res) => {
  
    var name = req.body.name;
    var userType = req.body.userType;
    var sql;
    console.log(userType)
   
    if(userType === "student"){
         sql = util.format(
            'select * from courses where status = "enrolled" and createdBy = "%s" and name = "%s";',
            userType,name);
       
    } else {
        sql = util.format(
            'select * from courses where status = "created" and createdBy = "%s" and name = "%s";',
            userType,name);
    }
    
    queryHelper.executeQuery(sql, function(err, result){
       res.writeHead(200,{
           'Content-Type' : 'application/json'
       })
       console.log(result);
       res.end(JSON.stringify(result));
    })
}) 



//Search for courses
app.post('/searchCourses', (req,res) => {
    var query = res.body.search;
   
    var sql = util.format(
        ' select * from courses where courseTerm like "%s" or CourseId like "%s" or CourseName like "%s";',
        query,
        query,
        query
      );
      queryHelper.executeQuery(sql, function(err, result){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result));
     })
})

//Enroll for course
app.post('/enrollCourse', (req,res) => {
    var query = req.body.q;
   
    //Add code here to check the status of the course enrolled
    var sql1 = "insert into coursehistory (Email, CourseId, status) values  ";
       sql1 += util.format("('%s', %d, '%s')", "Shivani", query, "ENROLLED" );
       queryHelper.executeQuery(sql1, function(err, result){
        /*res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result)); */
       // courses = JSON.stringify(result);
        res.end("Course enrolled");
        console.log("courses enrolled");
     })

})




//SignUp the canvas
app.post('/signUp', (req, res) => {
    const saltRounds = 10;
     var p = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
   
    //entering record to user table
    var sql = "INSERT INTO users (name, email , password)  values";
    sql += util.format("('%s', '%s', '%s')", req.body.name, req.body.email, p);
       queryHelper.executeQuery(sql, function(result, err){
           if(err){
            
           } 
       }) 
    //entering record into profiles table
       var sql = "INSERT INTO profile (name, email , password ,about ,city , country , company , school , hometown , languages , gender, userType)  values";
       sql += util.format("('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", req.body.name, req.body.email, p
       ,req.body.about, req.body.city, req.body.country, req.body.company, req.body.school, req.body.hometown, req.body.languages, req.body.gender,
       req.body.userType);
       queryHelper.executeQuery(sql, function(result, err){
           if(err){
           } 
       }) 
       res.end("Record Created")
})


//fetch the profile of student/faculty
app.post('/profile', (req,res) => {
    var name = req.body.name;
    var sql = util.format(
        'select * from profile where name = "%s";',
        name);

        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Hii");
            }  else {
               
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
               
            }
        })       
           
    }) 

    app.post('/updateProfile', (req,res) => {
        var name = req.body.name;
        var sql = util.format(
            'update profile set about = "%s", city = "%s", country = "%s", company = "%s", school ="%s", hometown = "%s", languages = "%s", gender = "%s" where name = "%s";',
            req.body.about,  req.body.city,  req.body.country,  req.body.company,  req.body.school,
            req.body.hometown,  req.body.languages, req.body.gender, req.body.name);
    
            queryHelper.executeQuery(sql, function(err, result){
                if(err){
                    console.log("Hii");
                }  else {
                    console.log(result);
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                   
                }
            })       
               
        }) 

app.post('/announcements', (req,res) => {
    var name = req.body.courseId;
    var sql = util.format(
        'select * from announcements where courseId = %d;',
        name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
               
            }       
        })   
})


app.post('/createannouncements', (req,res) => {
    var name = req.body.courseId;
    var sql = "insert into announcements (Name, announcements, courseId) values";
    sql += util.format("('%s', '%s', %d)", req.body.name, req.body.announcements, req.body.courseId);
    
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

//Get assignments
app.post('/assignments', (req,res) => {
    var name = req.body.courseId;
    var sql = util.format(
        'select * from assignments where courseId = %d;',
        name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
             
            }       
        })   
})

app.post('/profile', (req,res) => {
    var name = req.body.courseId;
    var sql = util.format(
        'select * from assignments where courseId = %d;',
        name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

//create assignments - for faculty
app.post('/createAssignments', (req,res) => {
    var content = req.body.Content;
    var CourseId = req.body.CourseId;
    var name = req.body.name;
    var sql = "insert into assignments (Content, CourseId, Name) values";
    sql += util.format("('%s', %d, '%s')", req.body.Content, req.body.CourseId, req.body.name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

//get Submissions - for student
app.post('/submissions', (req,res) => {
    var name = req.body.name;
    var assignmentId = req.body.assignmentId;
    var sql = util.format(
        'select * from submissions where AssignmentId = %d and Name = "%s";',
        assignmentId, name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

//submit assignments  : for students
app.post('/submitAssignments', (req,res) => {
    var name = req.body.name;
    var assignmentId = req.body.assignmentId;
    var content = req.body.content;
    var sql = " insert into submissions (AssignmentId, Name, content) values";
    sql += util.format("(%d, '%s', '%s')", req.body.assignmentId, req.body.name, req.body.content);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

//Fetch people present in the course
app.post('/people', (req,res) => {
   
    //select * from courses where CourseId = 1 and createdBy = "student" and status = "enrolled";
   
    var sql = util.format(
        'select * from courses where CourseId = %d and createdBy = "student" ;',
        req.body.courseId);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

app.get('/people/remove/', (req,res) => {
   
    
   
    var sql = 'delete from courses where name = "Sushmitha";'
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

/*app.post('/upload', (req,res) => {
    let uploadFile = req.formData.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
   
   res.end("Hello");
   
    
}) */

app.post('/grades', (req,res) => {
   
    var sql = util.format(
        'select * from grade where courseId = %d and user = "%s";',
        req.body.courseId, req.body.name);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
    
     
 })
 app.post('/giveGrades', (req,res) => {
   
    var sql = util.format(
        'select * from grade where courseId = %d ',
        req.body.courseId);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
    
    
     
})


//Faculty create quiz
app.post('/quiz', (req,res) => {
    var sql = "  insert into QUIZ ( courseId, qname, q1, op11 ,  op12 ,   op13 ,  op14 , cor1 ,  q2 ,  op21 ,  op22,  op23 ,  op24 ,  cor2 , d1 , d2) values ";
    sql += util.format("(%d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' , '%s', '%s' )",
    req.body.courseId,  req.body.qname,  req.body.q1,  req.body.op11 ,   req.body.op12 ,   req.body.op13 ,   req.body.op14 ,  req.body.cor1 ,   req.body.q2 ,   req.body.op21 ,   req.body.op22,   req.body.op23 ,   req.body.op24 ,   req.body.cor2 ,  req.body.d1, req.body.d2);     
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
 })


 app.post('/getQuiz', (req,res) => {

    var sql = util.format(
        'select * from QUIZ where courseId = %d;',
        req.body.courseId);
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
   
    
    
     
})

app.get('/getQuizContent/:id', (req,res) => {
    console.log();
    var sql = util.format(
        'select * from QUIZ where id = %d;',
        req.params.id);

        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})
app.get('/getCourse/:id', (req,res) => {
    console.log();
    var sql = util.format(
        'select * from courses where CourseId = %d and createdBy = "faculty";',
        req.params.id);

        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

app.get('/assignments/:id', (req,res) => {
    console.log();
    console.log(req.params.id)
    var sql = util.format(
        'select * from assignments where id = %d;',
        req.params.id);
     
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

app.get('/submissions/:id', (req,res) => {
    console.log();
    console.log(req.params.id)
    var sql = util.format(
        'select * from submissions where AssignmentId = %d;',
        req.params.id);
     
        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

app.post('/takequiz', (req,res) => {
    console.log();
    var sql = util.format(
        'select * from QUIZ where id = %d;',
        req.params.id);

        queryHelper.executeQuery(sql, function(err, result){
            if(err){
                console.log("Error", err);
            }  else if(result.length === 0){
                console.log("Invalid login");
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end();
            } else {
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result));
                console.log(result);
            }       
        })   
})

app.post('/download-file/:file(*)', function(req, res){
    console.log('Inside DOwnload File');
    var file = req.params.file;
    var filelocation = path.join(__dirname + '/uploads', file);
    var img = fs.readFileSync(filelocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {
        'Content--type': 'image/jpg'
    });
    res.end(base64img);
});






app.listen(9000, () => console.log('Started Canvas Server on 9000!'));