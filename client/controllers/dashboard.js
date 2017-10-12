angular.module('MyApp')
  .controller('dashboardCtrl',['$http','$routeParams','$location','$auth', 'toastr', 'Account','testService', function($http,$routeParams,$location, $auth, toastr, Account,testService) {
//==================================================
// set the context =================================
//==================================================
      var main = this;

//==================================================
// Check if isAuthenticated ========================
//==================================================
    main.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

//==================================================
// Function to get all test by user has taken ======
//==================================================
    main.getAllUserTest = function() {
          main.testLength = 0;
          main.allTest = 0;

      //========= Get user Profile=========
      Account.getProfile()
        .then(function(response) {
          main.user = response.data;
        main.userId = main.user._id

      //========= Get user test taken by user=========
      testService.getAllTestUser(main.userId)
        .then(function(response) {
          main.userTest = response.data
           main.testLength =response.data.length;
           console.log(main.testLength)

           main.alltestuser = response.data
      //========= Get all registered test=========
      testService.getAllTest(main.userId)
        .then(function(response) {
          main.allTest = response.data
           main.alltestLength =response.data.length;
           console.log(main.alltestLength)

//============No Of Tests Attempted Chart =================
Highcharts.chart('container', {
    chart: {
        backgroundColor: '#fff',
        type: 'pie',
        style: {
            fontFamily: 'Open Sans'
        },
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth:20,
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
             showInLegend: true

          }},
        series: [{
                name: 'Tests',
                colorByPoint: true,
                        data: [
                       { name: 'Unattempted Tests',
                           y:main.alltestLength-main.testLength
                        },
                        {name: 'Tests Attempted',
                            y:main.testLength,
                            sliced: true,
                            selected: true
                        }]
                        }],
                        });                   
//============================chart ends=========================

        }, function error(response){
          console.log(response)
        })
        }, function error(response){
          console.log(response)
        })

      //========= Get all question attempted by user=========
      testService.getAllTestUserQuestion(main.userId)
      .then( function(response){
          main.userTest = response.data
          main.avgScore = 0;
          main.totalCorrect = 0;
          main.totalWrong = 0;
          main.userTest.forEach(trueOrFalse)
          function trueOrFalse(answer, index) {
          if (answer.correctAnswer == answer.userAnswer) {
            main.totalCorrect++;
            //  console.log("total correct---- "+main.totalCorrect);
          }else {
            main.totalWrong++;
            //  console.log("total wrong---- "+main.totalWrong);
                }
            };
        //========= Get average score=========
          main.avgScore = (main.totalCorrect*100)/(main.totalCorrect+main.totalWrong)


//============Average Score Chart =================
Highcharts.setOptions({
    colors: ['#73eb68', '#42bcea']
})
Highcharts.chart('containerav', {
    chart: {
        backgroundColor: '#fff',
        type: 'pie',
        style: {
            fontFamily: 'Open Sans'
        },
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 0
        }
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth:45,
            innerSize: 100,
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            },
             showInLegend: true

          }},

         series: [{
                name: 'Answers',
                colorByPoint: true,
                data: [
                    {name: 'Total Wrong ',
                        y:main.totalWrong},
                    {name: 'Total Correct ',
                        y:main.totalCorrect,
                        selected: true}
                    ]
                    }],
                    });                  

  })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    })
    };    
 }]);
