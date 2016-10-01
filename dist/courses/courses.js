(function (angular) {
  "use strict";

  var app = angular.module('myApp.courses', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('CourseCtrl', ['$scope', 'courseList', function($scope, courseList) {
      $scope.courses = courseList;
      $scope.editCourse = {};
      $scope.newCourse = {
        title: '',
        description: ''
      };

      $scope.addCourse = function() {
        if( $scope.newCourse.title && $scope.newCourse.description ) {
          $scope.courses.$add($scope.newCourse)
          .then(function(ref) {
            $scope.newCourse = {
              title: '',
              description: ''
            };
            var id = ref.key();
            console.log("added record with id " + id);
            // list.$indexFor(id); // returns location in the array
          })
          .catch(function(error) {
            console.log("Error:", error);
          });
        }
      };

      $scope.remove = function(course){
        $scope.courses.$remove(course)
      }
      $scope.save = function(course){
        console.log('hi');
        $scope.courses.$save(course)
        .then(function(ref) {
          $scope.editCourse = {};
          var id = ref.key();
          console.log("added record with id " + id);
          // list.$indexFor(id); // returns location in the array
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
      }

      $scope.setEditableCourse = function(course) {
        $scope.editCourse=course;
      }
      }
    ]);

  app.factory('courseList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('courses').limitToLast(10);
    return $firebaseArray(ref);
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/courses', {
      templateUrl: 'courses/courses.html',
      controller: 'CourseCtrl'
    });
  }]);

})(angular);
