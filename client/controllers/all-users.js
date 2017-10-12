angular.module('MyApp')
  .controller('allUsersCtrl',['$auth', 'toastr', 'Account','testService','$location', function( $auth, toastr, Account,testService,$location) {

//==================================================
// set the context =================================
//==================================================
    var main = this;

//==================================================
// get all user ====================================
//==================================================
    main.allUser = function(){
        testService.getAlluser()
        .then(function sucess(res){
            main.alluser = res.data},
             function error(res){console.log(res)})
            }
            
//==================================================
// get all test that user have taken ===============
//==================================================
        main.getalltestuser = function(userId){
        testService.getAllTestUser(userId)
        .then(function sucess(res){
            $location.path('/admin-dashboard/all-users/'+userId+'/performance');},
          function error(res){console.log(res)})
           }

  }]);
