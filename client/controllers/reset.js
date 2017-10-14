angular.module('MyApp')
  .controller('ResetCtrl', ['$http','Account','$routeParams',function($http, Account, $routeParams) {
    var main = this;
    main.resetPassword = function() {

        var myData = {
            password        :       main.password,

        }
        main.token = $routeParams.token;    
        $http.post('/reset/'+main.token, myData)
        .then(function(response) {
          main.messages = {
            success: [response.data]
          };
        })
         .catch(function(response) {
          main.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

  }]);
