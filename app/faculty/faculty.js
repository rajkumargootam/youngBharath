(function (angular) {
  "use strict";

  var app = angular.module('myApp.faculty', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('FacultyCtrl', ['$scope', 'facultyList', function($scope, facultyList) {
      $scope.faculties = facultyList;
      console.log($scope.faculties)
      $scope.editFaculty = {};
      $scope.newFaculty = {
        name: '',
        email: ''
      };

      $scope.addFaculty = function() {
        if( $scope.newFaculty.name && $scope.newFaculty.email ) {
          $scope.faculties.$add($scope.newFaculty)
          .then(function(ref) {
            $scope.newFaculty = {
              name: '',
              email: ''
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

      $scope.remove = function(faculty){
        $scope.faculties.$remove(faculty)
      }
      $scope.save = function(faculty){
        console.log('hi');
        $scope.faculties.$save(faculty)
        .then(function(ref) {
          $scope.editFaculty = {};
          var id = ref.key();
          console.log("added record with id " + id);
          // list.$indexFor(id); // returns location in the array
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
      }

      $scope.setEditableFaculty = function(faculty) {
        $scope.editFaculty=faculty;
      }

      }
    ]);

  app.factory('facultyList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('faculties').limitToLast(10);
    return $firebaseArray(ref);
  }]);


  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/faculty', {
      templateUrl: 'faculty/faculty.html',
      controller: 'FacultyCtrl'
    });
  }]);

})(angular);
