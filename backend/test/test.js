var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2EyZjY3YzBiMzNkNjk4ZGQyMjNiNjciLCJzanN1aWQiOiIxMjMiLCJuYW1lIjoiTWF0dGhldyIsImVtYWlsIjoibWF0dGhld0BzanN1LmVkdSIsInJvbGUiOiJzdHVkZW50IiwicGFzc3dvcmQiOiIkMmIkMTAkRDlBUVI1UjJ1T2k4NnB0VDV1RGd2dUY4bGJwRHlBTXBZZEhiTjJiSlJ5a2JWVEhoOFl3YW0iLCJpbWFnZSI6InVwbG9hZHMvbWFsZVN0dWRlbnQuanBlZyIsInBob25lIjoiOTk5OTk5OTk5IiwiYWJvdXRtZSI6Ikl0cyBtZWVlLiEhISIsImNpdHkiOiJDdXBlcnRpbm8iLCJjb3VudHJ5IjoiVVNBIiwiY29tcGFueSI6IlNUVURFTlQiLCJzY2hvb2wiOiJTSlNVIiwiaG9tZXRvd24iOiJHcmVhdGVyIE5vaWRhIiwibGFuZ3VhZ2VzIjoiRW5nbGlzaCIsImdlbmRlciI6Ik1hbGUiLCJpYXQiOjE1NTUyMzExODIsImV4cCI6MTU1NTIzODM4Mn0.s64I0fxGlpQxJLhicgGY_JSFaCwTOfXiDpF794KgP8w';

describe('CANVAS-BACKEND', function () {

    it('GET /UserProfile', function () {
        agent.get('/UserProfile?sjsuid=123')
            .set('Authorization', 'Bearer ' + token)
            .then(function (res) {
                var obj = JSON.parse(res.text);
                //console.log("obj in userprofile", obj)
                expect(obj.length).to.equal(1);
                expect(obj[0].role).to.equal('student');
            });
    });

    it('GET /getCourses', function () {
        agent.get('/getCourses?sjsuid=123&&role=student')
            .set('Authorization', 'Bearer ' + token)
            .then(function (res) {
                var obj = JSON.parse(res.text);

                expect(obj.length).to.equal(3);
                expect(obj[0].id).to.equal('CMPE 273');
                expect(obj[1].id).to.equal('CMPE 272');
                expect(obj[2].id).to.equal('CMPE 202');
            });
    });

    it('GET /getStudents', function () {
        agent.get('/getStudents?courseid=CMPE 202&&role=student')
            .set('Authorization', 'Bearer ' + token)
            .then(function (res) {
                var obj = JSON.parse(res.text);
                expect(obj.length).to.equal(1);
                expect(obj[0].sjsuid).to.equal('123');
            });
    });

    it('GET /getAnnouncement', function () {
        agent.get('/getAnnouncement?courseid=CMPE 273&&sjsuid=123')
            .set('Authorization', 'Bearer ' + token)
            .then(function (res) {
                var obj = JSON.parse(res.text);
                expect(obj.length).to.equal(1);
                expect(obj[0].topic).to.equal('Test cases added');
            });
    });

    it('GET /getGrades', function () {
        agent.get('/getGrades?courseid=CMPE 273&&sjsuid=123')
            .set('Authorization', 'Bearer ' + token)
            .then(function (res) {
                var obj = JSON.parse(res.text);
                expect(obj.length).to.equal(3);
                expect(obj[0].description).to.equal('FINAL PROJECT');
                expect(obj[1].description).to.equal('Lab 3');
                expect(obj[2].description).to.equal('test');
            });
    });
})