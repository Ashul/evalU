angular.module('MyApp')
  .controller('userDetailsCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {
//==================================================
// set the context =================================
//==================================================
    var main = this;

//==================================================
// get all tests by user =================================
//==================================================
    main.getAllUserTest = function() {
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;
          main.userId = main.user._id
          main.testId = $routeParams.testId

      //=========== get single test user's question    
      testService.getsingleTestUserQuestion(main.testId, main.userId)
      .then( function(res){
                  console.log(res.data)

          main.userTestQuestions = res.data})
        })
        .catch(function(res) {
          toastr.error(res.data.message, response.status);
        });
    };              
  }]);
