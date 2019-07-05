# Lab 3 - Using GraphQL andReactApollo client

The goal is to create canvas application using GraphQL for queries and mutations with the help of Apollo client  in reactJS and  use a graphql and express server in the backend to handle multiple requests. 

Added graphQL queries and mutations to handle requests from client side by creating schema for users, courses.

Added below functionalities for student and professor like :
* Sign up new Student/Professor(at least first name, last name, Email andpassword)
* Sign in existing Student/Professor(EncryptPasswords)
* Sign out. 
* List enrolled courses on dashboard 
* Update Profile of Student/Professor(Without Profile Image update).
* Createa Course.
* View courses(Both Studentand Professor).

## Steps to run application:

Front End:

Download the repository. Install the required dependencies from package.json using npm install. Start the application using "npm start".

Back End:

Download the repository. Install the required dependencies from package.json using npm install. Set up the connection pooling configuration and db configuration in the file mongoose.js. Start the server using the command "node index.js"
