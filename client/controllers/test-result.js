angular.module('MyApp')
  .controller('testResultCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {
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
// check admin =====================================
//==================================================
      main.adminCheck = function(){
      if (main.user.email == "anshul@gmail.com"){} else{
        alert("You're Not Authorized To View This Page")
        $location.path( "/dashboard" );
      }
    };

//==================================================
// Get single test Answer ==========================
//==================================================
  main.getSingleTestAnswer = function() {
  main.userId = $routeParams.userId
  main.testId = $routeParams.testId
  main.data={userId:main.userId}
      testService.getSingleTestAnswers(main.testId, main.data)
        .then(function(response) {
            main.totalCorrect = 0;
            main.totalWrong = 0;
            main.totalpercent = 0;
            main.answers = response.data;
            main.answers.forEach(trueOrFalse)
            function trueOrFalse(answer, index) {
              if (answer.correctAnswer == answer.userAnswer) {
                   main.totalCorrect++;
                   console.log("total correct---- "+main.totalCorrect);
                }else {
                     main.totalWrong++;}
                       };

        //============ get total percent ============
        main.answers.forEach(totalpercent);
        function totalpercent(answer, index) {
            main.totalpercent = (main.totalCorrect*100)/(main.totalCorrect+main.totalWrong)
      };
        }, function error(res){
          console.log(res)
        })  }
        
        }]);
