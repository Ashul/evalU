angular.module('MyApp')
  .controller('HomeCtrl', function($http, Account) {
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

  });
