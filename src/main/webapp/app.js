myModule = angular.module('examApp', ['ngResource']);

myModule.factory('ExamFactory', function ()
{

    var studentsInfo = {};
    studentsInfo.allCourses = [
        {courseId: 1000, courseName: "Basic Programming"},
        {courseId: 1001, courseName: "Advanced Programming"},
        {courseId: 1003, courseName: "DataBase Intro"}];
    studentsInfo.students = [];
    studentsInfo.students.push({studentId: 100, name: "Peter Hansen", grades: [{grade: "10"}, {grade: "12"}, {}]});
    studentsInfo.students.push({studentId: 101, name: "Jan Olsen", grades: [{grade: "7"}, {grade: "10"}, {}]});
    studentsInfo.students.push({studentId: 102, name: "Gitte Poulsen", grades: [{grade: "7"}, {grade: "7"}, {}]});
    studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});

    var getStudents = function () {
        return studentsInfo.students;
    };
    var getCourses = function () {
        return studentsInfo.allCourses;
    };
    return {
        getStudents: getStudents,
        getCourses: getCourses
    };
});



myModule.directive('studentGrades', ["ExamFactory", function (ExamFactory)
    {

        var controller = function ($scope)
        {
            var self = this;

            self.students = ExamFactory.getStudents();
            self.courses = ExamFactory.getCourses();

            $scope.calculateAverage = function (Grades) {

                var sum = 0; // these need to be set, otherwise you get NaN. 
                var length = 0; // ^
                for (var i = 0; i < Grades.length; i++) {
                    if (Grades[i].grade) {
                        sum += parseInt(Grades[i].grade, 10);
                        length++;
                    }
                }
                var avg = sum / length;
                return avg;

            };

        };

        return {
            restrict: 'E', // Can only be used as an element
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            templateUrl: "studentGrades.html"
        };

    }]);


// looked at https://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-6-using-controllers 
// for help.


// Part 6 of assignment. --- --- --- --- --- --- ---
// 
// I would do something like this, get the json object from the RestAPI save(push) it into studentsInfo.
// Then I'd use it like I have in this assignment.
/*
 * 
 * myModule.factory('ExamFactory', function ()
{
 //Return Students from the server
    var getStudents = function () 
    {
        var studentsInfo = {};
        studentsInfo.students = [];
        $.getJSON("http://localhost:8084/some-website/api/students/all", function (result)
        {
            $.each(result, function (student)
            {
                studentsInfo.students.push({studentId: 103, name: "John McDonald", grades: [{grade: "10"}, {}, {grade: "7"}]});
            });
        });
    };

    
    return 
    {
        getStudents: getStudents
    };

});

 */