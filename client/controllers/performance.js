angular.module('MyApp')
  .controller('performanceCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {

//==================================================
// set the context =================================
//==================================================
    var main = this;

//==================================================
// Get user  =======================================
//==================================================
    main.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;
              main.adminCheck()})
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    }; 
//==================================================
// Check Admin =====================================
//==================================================
            
    main.adminCheck = function(){
      if (main.user.email == "admin@gmail.com"){} else{
        alert("You're Not Authorized To View This Page")
        $location.path( "/dashboard" );
      }
    };

//==================================================
// Get all Test for user ===========================
//==================================================
main.getalltestuser = function(){
  main.userId = $routeParams.userId
  testService.getAllTestUser(main.userId)
  .then(function sucess(res){
    main.usertest=res.data
    main.testId=res.data._id})}
  }]);
