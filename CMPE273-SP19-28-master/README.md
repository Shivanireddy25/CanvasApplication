# Lab 2 - Canvas Application

Implemented a prototype of a Canvas application which include the functionalities in it for different roles like student and faculty.
For student, it includes enroll, delete course, submit assignments, view announcements , grades and people in class etc. 
For Faculty, the functionalities include creating courses, giving grades, uploading lecture notes, files, creating quiz and giving permission code to students etc.
In addition to these, common functionality to student and faculty include login, sign Up and sign Out etc.

Performance Analysis is done using Jmeter Testing for backend APIs and results are compared with and without connection pooling.

Testing Backend APIs using Mocha and frond-end pages using Enzyme and Jest is also achieved in the lab.

Make sure kafka is installed and topics are created, since kafka is used in this lab as a message queue.

Front End:

Download the repository.
Install the required dependencies from package.json using npm install.
Start the application using "npm start".

Back End:

Download the repository.
Install the required dependencies from package.json using npm install.
Set up the connection pooling configuration and db configuration in the file mongoose.js.
Start the server using the command "node index.js"

kafka Backend:

Download the repository.
Install the required dependencies from package.json using "npm install".
Start the server using the command "node server.js"

For mocha to run, Go to backend folder and run npm test in Canvas Application. 
For Enzyme testing, Go to frontend folder and run npm test in Canvas Application it creates snapshots in the application to compare the views.
