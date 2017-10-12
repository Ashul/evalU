angular.module('MyApp')
  .controller('userScoreCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {
//==================================================
// set the context =================================
//==================================================
    var main = this;
    main.testId = $routeParams.testId;

//==================================================
// Get Single test Answers =========================
//==================================================
    main.getSingleTestAnswer = function() {
      main.testId = $routeParams.testId;

      //========= get user profile ============
      Account.getProfile().then(function(res){
      main.userId = res.data._id
        main.data={
            userId:main.userId
        }
      //========== get single test answers ==========  
      testService.getSingleTestAnswers(main.testId, main.data)
        .then(function(response) {
            main.totalCorrect = 0;
            main.totalWrong = 0;
            main.timeTakenTotal = 0;
            main.totalpercent = 0;

          main.answers = response.data;

          //======== total correct and wrong ========
          main.answers.forEach(trueOrFalse)
          function trueOrFalse(answer, index) {
          if (answer.correctAnswer == answer.userAnswer) {
            main.totalCorrect++;
            // console.log("total correct---- "+main.totalCorrect);
          }else {
            main.totalWrong++;
            // console.log("total wrong---- "+main.totalWrong);
          }
        };
        
        //============== get total time taken ==============
        main.answers.forEach(timeTakenCalculate);
        function timeTakenCalculate(answer, index) {
          main.timeTakenTotalX =  main.timeTakenTotalX+answer.timeTakenEach;
          main.timeTakenTotal = Math.floor(  main.timeTakenTotalX / 60) + ":" + (  main.timeTakenTotalX % 60 ?   main.timeTakenTotalX % 60 : '00');

      };

      //================= get total percent ===============
        main.answers.forEach(totalpercent);
        function totalpercent(answer, index) {
            main.totalpercent = (main.totalCorrect*100)/(main.totalCorrect+main.totalWrong)
      };
        })
          })
        .catch(function(response) {
          console.log("error");
          alert("Error!!!!, For More Info, Check Your Browser's Console")
          console.log(response);
        });
        
    };

//=============== invoke the function ==========
     main.getSingleTestAnswer();


//==================================================
// Get single test =================================
//==================================================
main.viewSingleTest = function() {
  main.testId = $routeParams.testId;
  testService.getsingleTest(main.testId)
    .then(function(response) {
      main.test = response.data;
    })
    .catch(function(response) {
      alert("error, check console!")
      console.log("error");
      console.log(response);
    });
};
//============== invoke the function
main.viewSingleTest();
  }]);
