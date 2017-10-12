angular.module('MyApp')
  .controller('createquestionCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {

//==================================================
// set the context =================================
//==================================================
      var main = this;

//===================================================
// Load All Questions ===============================
//===================================================
    main.loadAllquestion = function(){
        main.testId = $routeParams.testId;
        testService.getAllQuestion(main.testId)
        .then(function sucess(res){
            main.tests = res.data;},
            function error(res){console.log(res)})
             }


//===================================================
// Load Single Test =================================
//===================================================
    main.loadsingleTest = function(){
         main.testId = $routeParams.testId;
         testService.getsingleTest(main.testId)
        .then(function sucess(res){
            main.test = res.data;},
            function error(res){console.log(res)})
             }


//===================================================
// create Question ==================================
//===================================================
    main.createQuestion = function(){
        var myData = {
            question             : main.question,
            optionA              : main.optionA,
            optionB              : main.optionB,
            optionC              : main.optionC,
            optionD              : main.optionD,
            answer               : main.answer

        }
        main.testId = $routeParams.testId;  
        $http.post('/test/'+main.testId+'/question', myData)
        .then(function sucess(res){
             $location.path('/create-question/'+main.testId);},
             function error(res){console.log(res)})
    }


//===================================================
// update Question  =================================
//===================================================
    main.updateQuestion = function(){
        var myData = {
            question             : main.question,
            optionA              : main.optionA,
            optionB              : main.optionB,
            optionC              : main.optionC,
            optionD              : main.optionD,
            answer               : main.answer

        }
        main.questionId = $routeParams.questionId; 
        $http.put('/test/questions/'+main.questionId, myData)
        .then(function sucess(res){
            main.loadAllquestion()
            $location.path('/create-question/'+main.testId);},
            function error(res){console.log(res)})
                }


//===================================================
// Delete Single Test ===============================
//===================================================
    main.deletesingleTest = function(){
        main.testId = $routeParams.testId;
        testService.deleteSingleTest(main.testId)
        .then(function sucess(res){
            main.test = res.data;
             $location.path('/admin-dashboard');}, 
             function error(res){console.log(res)})
    }


//===================================================
// Load Single Question =============================
//===================================================
    main.loadsinglequestion = function(){
        main.questionId = $routeParams.questionId;
        $http.get('/test/questions/'+main.questionId)
        .then(function sucess(res){
            main.test = res.data;}, 
            function error(res){console.log(res)})
    }

//===================================================
// Delete Single Question =========================
//===================================================
    main.deletesingleQuestion = function(){
        main.testId = $routeParams.testId;
        main.questionId = $routeParams.questionId; 
        $http.delete('/test/'+ main.testId+'/questions/'+main.questionId)
        .then(function sucess(res){
            main.test = res.data;
            $location.path('/create-question/'+main.testId);}, 
            function error(res){console.log(res)})
    }

  }]);
