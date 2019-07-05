var expect    = require("chai").expect;
var index = require("../index");
var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:9000");

var request = require("request");

describe("Test to verify fetch of all Courses", function() {
    var url = "http://localhost:9000/coursesOnly";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });
});




describe("Get courses for user", function() {

       
        it("Get courses for user", function(done) {
            server
                .post("/courses")
                .send({ name: "Shivani" })
                .expect(200)
                .end(function(err, res) {
                  console.log("Status: ", res.status);
                  res.status.should.equal(200);
                  done();
              });
                
                
        });

       
    });

    describe("Announcements Test", function() {

    
      it("fetch announcements", function(done) {
          server
              .post("/announcements")
              .send({ courseId : 1 })
              .expect(200)
              .end(function(err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
              
              
      });

     
  });

  describe("Profile Test", function() {

    
    it("Fetch profile", function(done) {
        server
            .post("/profile")
            .send({ name : "Shivani" })
            .expect(200)
            .end(function(err, res) {
              console.log("Status: ", res.status);
              res.status.should.equal(200);
              done();
          });
            
            
    });

   
});

describe("Assignments Test", function() {

  
  it("Fetch assignments", function(done) {
      server
          .post("/assignments")
          .send({ courseId : 1})
          .expect(200)
          .end(function(err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
        });
          
          
  });

 
});
  
