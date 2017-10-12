angular.module('MyApp')
  .controller('adminDashboardCtrl',['$auth', 'toastr', 'Account','$location','testService', function( $auth, toastr, Account,$location,testService) {

      var main = this;
    main.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    main.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;
              main.adminCheck()
              console.log(main.user.email)

        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };             
    main.adminCheck = function(){
      if (main.user.email == "admin@gmail.com"){} else{
        alert("You're Not Authorized To View This Page")
        $location.path( "/dashboard" );
      }
    };


//===================================================
// Load All Tests ===================================
//===================================================
    main.loadAllTest = function(){
      main.getProfile();
        testService.getAllTest()
        .then(function sucess(res){
            main.tests = res.data;
            console.log(main.tests)
            }, function error(res){
            console.log(res)
        });
            }
    
     main.getProfile();
  }]);
