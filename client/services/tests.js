angular.module('MyApp')
.service('testService',['$http', function($http){

//==================================================
// Get All test ====================================
//==================================================
var getAllTest = function(){
      return $http.get('/test/all').success(function(data){});}

//==================================================
// get all user ====================================
//==================================================
var getAlluser = function(){
      return $http.get('/user/all')}

//==================================================
// get all test user ===============================
//==================================================
var getAllTestUser = function(userId){
      return $http.get('/test/all/'+ userId).success(function(data){});};

//==================================================
// get all test user's question ====================
//==================================================
var getAllTestUserQuestion = function(userId){
      return $http.get('/test/all/'+ userId+'/questions').success(function(data){});};

//==================================================
// get single test user's question =================
//==================================================
var getsingleTestUserQuestion = function(testId, userId){
        return $http.get('/test/'+testId +'/'+userId+'/questions').success(function(data){});};

//==================================================
// get all Questions ===============================
//==================================================
var getAllQuestion = function(testId){
         return $http.get('/test/'+testId+'/question').success(function(data){});};

//==================================================
// get single test =================================
//==================================================
var getsingleTest = function(testId){
        return $http.get('/test/'+testId).success(function(data){});};


//==================================================
// create  Test ====================================
//==================================================
var getTest = function(user){
        return $http.post('/test/createTest', user).success(function(data){});};

//==================================================
// get performance =================================
//==================================================
// var setperformance = function(data){
//         return $http.post('/test/performance', data).success(function(data){});}

//==================================================
// delete test ======================================
//==================================================
var deleteSingleTest = function(testId){
        return $http.get('/test/'+testId+'/delete').success(function(data){})};

//==================================================
// delete single question ==========================
//==================================================
var deleteSingleQuestion = function(QId){
        return $http.get('/test/'+QId+'/delete').success(function(data){});};

//==================================================
// get single question =============================
//==================================================
var getsingleQuestion = function(QId){
         return $http.get('/test/'+QId).success(function(data){});};

//==================================================
// send answer =================================
//==================================================
var sendAnswer = function(testId, questionId, data){
         return $http.post('/test/'+testId+'/questions/'+questionId+'/answer', data).success(function(data){});};


//==================================================
// get single test answer ==========================
//==================================================
   var getSingleTestAnswers =  function(testId, data) {
        return $http.post('/test/'+testId+'/answers', data)};

//==================================================
// get test attemptedby user =======================
//==================================================
var testAttemptedBySend = function(testId, data) {
        return $http.put('/test/'+testId+'/attemptedby', data);
      }


    return{
        getTest                   :   getTest,
        getAlluser                :   getAlluser,
        getAllTestUser            :   getAllTestUser,
        getAllTestUserQuestion    :   getAllTestUserQuestion,
        getAllTest                :   getAllTest,
        getsingleTest             :   getsingleTest,
        deleteSingleTest          :   deleteSingleTest,
        getsingleQuestion         :   getsingleQuestion,
        getAllQuestion            :   getAllQuestion,
        sendAnswer                :   sendAnswer,
        getSingleTestAnswers      :   getSingleTestAnswers,
        testAttemptedBySend       :   testAttemptedBySend,
        getsingleTestUserQuestion :   getsingleTestUserQuestion,
        // setperformance            :   setperformance
    }

}])