'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.config',
    'myApp.security',
    'myApp.home',
    'myApp.account',
    'myApp.chat',
    'myApp.login',
    'myApp.courses',
    'myApp.faculty'
  ])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/home'
    });
  }])

  .run(['$rootScope', 'Auth', 'fbutil', '$firebaseArray', function($rootScope, Auth, fbutil, $firebaseArray) {
    // track status of authentication
    Auth.$onAuth(function(user) {
      console.log(user);
      $rootScope.loggedIn = !!user;
      $rootScope.user = user.password
      var ref = fbutil.ref('users')
      $rootScope.allUsers=$firebaseArray(ref);
      console.log($rootScope.allUsers);
      $rootScope.allUsers.map(function(user) {
        if(user.email===$rootScope.user.email) {
          $rootScope.user.role = user.role;
        }
      })
    });
  }]);
