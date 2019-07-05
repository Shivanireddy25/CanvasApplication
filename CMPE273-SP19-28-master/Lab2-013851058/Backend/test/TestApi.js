var expect    = require("chai").expect;
var index = require("../index");
var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:9000");

var request = require("request");

describe("Test to verify fetch of all People", function() {
    var url = "http://localhost:9000/allPeople";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(401);
      });
    });
});



describe("Get courses for user", function() {  
        it("Get courses for user", function(done) {
            server
                .post("/courses")
                .set('Authorization', 'bearer ' + "token")
                .send({name: "s", userType: "student"})
                .expect(200)
                .end(function(err, res) {

                  done();
              });
                        
        });
    });


    describe("Sign user", function() {  
      it("Sign user with credentials", function(done) {
          server
              .post("/signIn")
              .send({name: "s", password: "s"})
              .expect(200)
              .end(function(err, res) {
                res.status.should.equal(200);
                done();
            });
                      
      });
  });


    

    describe("Announcements Test", function() {

    
      it("Unauthorized error should be thrown(Authoration not sent)", function(done) {
          server
              .post("/announcements")
              .send({courseId: "C273"})
              .expect(200)
              .end(function(err, res) {
                res.status.should.equal(401);
                done();
            });
              
              
      });

     
  });

  describe("Profile Test", function() {

    
    it("Fetch profile ", function(done) {
        server
            .post("/profile")
            .send({name: "s"})
            .set('Authorization', 'bearer ' + "token")
            .expect(200)
            .end(function(err, res) {
             
              done();
          });
            
            
    });

   
});


