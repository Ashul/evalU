angular.module('MyApp')
  .controller('startTestCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService','$interval','$timeout', function($http,$routeParams,$location, $auth, toastr, Account,testService,$interval,$timeout) {
//==================================================
// set the context =================================
//==================================================
    var main = this;
//==================================================
// prevent system refresh ==========================
//==================================================

  document.onkeydown = function(){
  switch (event.keyCode){
        case 116 : //F5 button
            event.returnValue = false;
            event.keyCode = 0;
            return false;
        case 82 : //R button
            if (event.ctrlKey){ 
                event.returnValue = false;
                event.keyCode = 0;
                return false;
            }
    }
}

//=========================== system refresh end =====================

    main.testId = $routeParams.testId;
    main.userId = 
    main.qLength = 0;


//===================================================
// Load single test  All Question ===================
//===================================================
    main.getSingleTestQuestions = function() {

      //========== get all auestions ==============
      testService.getAllQuestion(main.testId)
        .then(function(response) {
          // ==============counter==============
          main.totaltime = (response.data.timeLimit)*(60)
          main.counter = main.totaltime;
          main.onTimeout = function(){
              if(main.counter !== 0){
                main.counter--;
                mytimeout = $timeout(main.onTimeout,1000);}
            }
            var mytimeout = $timeout(main.onTimeout,1000);
            //===========counter ends =============
          
          //========== get time taken per question =======
          main.qTime = 0;
          var qTimeTaken;
          // start time
          main.start = function() {
          // stops any running interval to avoid two intervals running at the same time
          main.stop();
          // store the interval promise
          qTimeTaken = $interval(incrementSeconds, 1000);
          };
          // stops the interval
          main.stop = function() {
          $interval.cancel(qTimeTaken);
          };
          // starting the interval by default
          main.start();
          // =========== increment seconds =========
         function incrementSeconds() { main.qTime += 1; }

         //============= get all question one by one ========
            main.qLength = response.data.questions.length;
            main.eachQuestion = response.data.questions[0]
             var i = 1;
             main.next = function(){
               if(i <  main.qLength){
             main.eachQuestion = response.data.questions[i++]
            }else{
                 toastr.success('You have successfully completed the test!');
                 $location.path('/start-test/'+main.testId+'/user-score');}
             }
        })
        .catch(function(response) {
          console.log("error");
          alert("Error!!!!, For More Info, Check Your Browser's Console")
          main.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
    //view single test end


    //==============store solution to db start ====================
    main.storeSolution = function(option, questionId, userId, testId, answer) {
//==================================================
// get user Profile ================================
//==================================================
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;      

      main.questionId = questionId
      main.option = option;
      main.data = {
        userId:main.user._id,
        testId:main.testId,
        questionId:main.eachQuestion._id,
        userAnswer:option,
        correctAnswer:answer,
        timeTakenEach: main.qTime,}
      //=========== send answer ============ 
      testService.sendAnswer(main.testId, main.questionId, main.data)
        .then(function(response) {})
        .catch(function(response) {
          main.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
        main.qTime = null;
      
    //store solution to db end
})
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
          

//==================================================
// update test =====================================
//==================================================
  main.updateTest = function() {
//==================================================
// get user Profile ================================
//==================================================
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;      
console.log(main.user)
      main.userId = main.user._id;
      main.email = main.user.email;
      main.testId = $routeParams.testId;
      main.data={userId:main.userId}
      var data = {
        testAttemptedBy: main.userId
      }
      if (main.email) {
          testService.testAttemptedBySend(main.testId, data)
         .then(function(response) { })
         .catch(function(response) {
          alert('error, check console for more info!')
          });
          } else {
            alert("You're Not Authorized To View This Page")
            $location.path( "/dashboard" );
          }})
  
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };       

main.updateTest();

//update test end
    }
//================= invoke the function ================

  }]).filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);