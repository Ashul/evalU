angular.module('MyApp')
  .controller('alltestCtrl',['$auth', 'toastr', 'Account','testService','$location','$window', function( $auth, toastr, Account,testService,$location,$window) {

//==================================================
// set the context =================================
//==================================================
    var main = this;

//==================================================
// Get user profile ================================
//==================================================
    main.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;})
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };             


//===================================================
// Load All Tests ===================================
//===================================================
    main.loadAllTest = function(){
      //============ Get all test ===============
        testService.getAllTest()
        .then(function sucess(res){
            main.tests = res.data;
           },function error(res){console.log(res)});
            
    //============== check user ================
    main.checkUser = function(testId){
          main.ifAttempted = null;
          main.notAttempted = true;
          testService.getsingleTest(testId)
             .then(function(response) {
                 main.testX = response.data;
                 main.ifAttempted = null;
                 main.notAttempted = true;
                 main.testAttemptedByAll = main.testX.testAttemptedBy;
                 main.testAttemptedByAll.forEach(function(id) {
                  //====== check if testAttemptedBy id matches user id ==========
                  if (id  == main.user._id ) {
                      console.log("user found");
                      main.ifAttempted = true;
                      console.log(main.ifAttempted);
                      main.notAttempted = false;}
                    });
                        })
        .catch(function(response) {
          alert("error, check console!")
          console.log("error");
          console.log(response);
        });

    };
  };
  //============ inoke the function===========
     main.getProfile();
  }]);
