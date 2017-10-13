angular.module('MyApp')
  .controller('NavbarCtrl',['$auth','Account', function( $auth, Account) {
    var main =this;
      main.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
      main.user = function(){
      Account.getProfile()
        .then(function(response) {
          main.userName = response.data
        },function error(response){
          console.log(error)
        })}
  }]);
