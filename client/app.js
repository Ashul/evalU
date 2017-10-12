angular.module('MyApp', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ngRoute', 'satellizer'])
  .config(function($routeProvider, $authProvider) {

    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }];

    var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }];

    /**
     * App routes
     */

  $routeProvider
    .when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      resolve: {skipIfLoggedIn: skipIfLoggedIn}
    })
    .when('/forgot', {
      templateUrl: 'partials/forgot-password.html',
      controller: 'forgotCtrl',
      resolve: {skipIfLoggedIn: skipIfLoggedIn}
    })
    .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfLoggedIn: skipIfLoggedIn }
      })
    .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {skipIfLoggedIn: skipIfLoggedIn}    
      })
    .when('/logout', {
        template: null,
        controller: 'LogoutCtrl'
     })
    .when('/admin-dashboard',{
        templateUrl: 'partials/admin-dashboard.html',
        controller: 'adminDashboardCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/admin-dashboard/all-users',{
        templateUrl: 'partials/all-users.html',
        controller: 'allUsersCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/admin-dashboard/all-users/:userId/performance',{
        templateUrl: 'partials/performance.html',
        controller: 'performanceCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/performance/:userId/:testId/test-result',{
        templateUrl: 'partials/test-result.html',
        controller: 'testResultCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/create-test',{
        templateUrl: 'partials/create-test.html',
        controller: 'createtestCtrl',
        resolve: {loginRequired: loginRequired}
          })
    .when('/create-test/:testId/update',{
        templateUrl: 'partials/update-test.html',
        controller: 'createtestCtrl',
        resolve: {loginRequired: loginRequired}
          })
    .when('/create-question/:testId',{
        templateUrl: 'partials/create-question.html',
        controller: 'createquestionCtrl',
        resolve: {loginRequired: loginRequired}
      })
    .when('/create-question/:testId/question',{
        templateUrl: 'partials/add-question.html',
        controller: 'createquestionCtrl',
        resolve: {loginRequired: loginRequired }
      })
    .when('/create-question/:testId/question/:questionId/edit',{
        templateUrl: 'partials/update-question.html',
        controller: 'createquestionCtrl',
        resolve: {loginRequired: loginRequired}
      })
    .when('/dashboard',{
        templateUrl: 'partials/dashboard.html',
        controller: 'dashboardCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/dashboard/:testId/:userId/user-score-details',{
        templateUrl: 'partials/user-score-details.html',
        controller: 'userDetailsCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/all-test-user',{
        templateUrl: 'partials/all-test-user.html',
        controller: 'dashboardCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/start-test/:testId',{
        templateUrl: 'partials/start-test.html',
        controller: 'startTestCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .when('/start-test/:testId/user-score',{
        templateUrl: 'partials/user-score.html',
        controller: 'userScoreCtrl',
        resolve: {loginRequired: loginRequired}        
      })
    .otherwise({
      redirectTo: '/home'
    })
    /**
     *  Satellizer config
     */
    $authProvider.facebook({
      clientId: '288668371639434'
    });

    $authProvider.google({
      clientId: '334585883806-n0ncrgfpuqgmke2vu79asolpq34v7pdl.apps.googleusercontent.com'
    });

  });
