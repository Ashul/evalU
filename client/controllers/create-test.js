angular.module('MyApp')
  .controller('createtestCtrl',['$routeParams','$http','$auth', 'toastr', 'Account','$location','testService', function($routeParams,$http, $auth, toastr, Account,$location, testService) {
//==================================================
// set the context =================================
//==================================================
      var main = this;

//===================================================
// create Test ======================================
//===================================================
        main.createTest = function(){
        var myData = {
            testName        :       main.testName,
            testCategory    :       main.testCategory,
            totalScore      :       main.totalScore,
            totalQuestions  :       main.totalQuestions,
            timeLimit       :       main.timeLimit,

        }
        main.testId = {}    
        testService.getTest(myData)
        .then(function sucess(res){
              $location.path('/create-question/'+res.data._id);}, 
              function error(res){console.log(res)})
    }

//===================================================
// update Test  =====================================
//===================================================
    main.updateTest = function(){
        var myData = {
            testName        :       main.testName,
            testCategory    :       main.testCategory,
            totalScore      :       main.totalScore,
            totalQuestions  :       main.totalQuestions,
            timeLimit       :       main.timeLimit,

        }
        main.testId = $routeParams.testId;    
        $http.put('/test/'+main.testId+'/update', myData)
        .then(function sucess(res){
             $location.path('/create-question/'+main.testId);}, 
             function error(res){console.log(res)})
    }


  }]);
