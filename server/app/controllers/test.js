//=========================================
// get the required packages ==============
//=========================================
var express = require('express');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var question = mongoose.model('question');
var test = mongoose.model('test');
var answer = mongoose.model('answer');
// var performance = mongoose.model('performance');
var resGenerator = require('../../libs/responseGenerator');

var testRouter = express.Router();
module.exports.Controller = function(app){

//==========================================
// API to get Test id ======================
//==========================================
    testRouter.param("qID", function(req, res, next, id) {
    test.findById(id, function(e, test) {
        if (e) return next(e);
        if (!test) {
            e = new Error("Not found (404)");
            e.status = 404;
            return next(e);
        }
        req.test = test;
        return next();
    });
});


//=========================================
// API to get answer id ===================
//=========================================
testRouter.param("aID", function(req, res, next, id) {
    req.question = req.test.question._id(id);
    if (!req.question) {
        e = new Error("Not found (404)");
        e.status = 404;
        return next(e);
    }
    next();
});

//==========================================
// API to get all Tests ====================
//==========================================
    testRouter.get('/all', function(req, res){
        test.find({}, function(err, tests){
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
               res.send(tests)
            }
        });
    });
//==========================================
// API to get all questions ====================
//==========================================

    testRouter.get('/all/q', function(req, res){
        question.find({}, function(err, tests){
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
               res.send(tests)
            }
        });
    });

//==========================================
// API to get all Answers ====================
//==========================================

    testRouter.get('/all/a', function(req, res){
        answer.find({}, function(err, tests){
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
               res.send(tests)
            }
        });
    });


//===========================================
// API to get all Tests by user =============
//===========================================
    testRouter.get('/all/:userId', function(req, res){
      test.find(
        {"testAttemptedBy" : req.params.userId})
        .populate('test')
            .then((answers, err) => {
            if (err) {
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
               res.send(error)
            }  else {
               res.send(answers);
                }
            });
            });

//===========================================
// API to get all question and answers by user ==
//===================================================
    testRouter.get('/all/:userId/questions', function(req, res){
     answer.find(
       {"user" : req.params.userId})
      .populate('test')
      .then((answers, err) => {
        if (err) {
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
       }  else {
       res.send(answers);
      }
  });
});


//============================================
// API to get single Test =======================
//===================================================
    testRouter.get('/:test_id', function(req, res){
    test.findById(mongoose.Types.ObjectId( req.params.test_id ), function(err, tests) {
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
                res.send(tests)
            }
        })
    })
//==============================================
// API to delete single Test =====================
//===================================================
    testRouter.get('/:id/delete', function(req, res){
         var id = req.params.id;
         test.remove({ _id: id }, function(err, tests) {
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
                res.send(tests)
            }
        })
    })


//==============================================
// API to update current Test ====================
//===================================================
    testRouter.put('/:id/update', function(req, res){
         var id = req.params.id;
         test.findOneAndUpdate({ _id: id },req.body, {new: true}, function(err, tests) {
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
            }else{
                res.send(tests)
            }
        })
    })


    

//=============================================
// API to create Test ===========================
//=================================================
    testRouter.post('/createTest', function(req,res){
            if(req.body.testName != undefined && 
            req.body.testCategory != undefined 
                ){

                var newTicket = new test({
                testName       :   req.body.testName,
                testCategory   :   req.body.testCategory,
                totalScore     :   req.body.totalScore,
                totalQuestions :   req.body.totalQuestions,
                timeLimit      :   req.body.timeLimit

                })
            newTicket.save(function(err, tests){
            if(err){
                var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                res.send(error)
              }
            else{
                res.send(tests)
            }
        })
            }else{
            res.json('some body parameter missing in create Question API')
            }
    })
// ====================================================================================
// ====================================================================================
// ================ Questions Start From Here =========================================
// ====================================================================================
// ====================================================================================


//===============================================
// API to create Question =========================
//===================================================
    testRouter.post('/:test_id/question', function(req, res, next) {
            var newquestion = new question(req.body);
            newquestion.save(function(err, status) {
              if (err){
                   var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                  res.send(error)
                  }
              else{
              test.findById({_id: req.params.test_id}, function(err, tests){
                tests.questions.push(status);
                tests.save( function(err, status) {
                    if(err){
                      var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
                      res.send(error)
                    }
                    else{
                    res.send(status);

                    }
                })
              });}               
    });
    });
         
//==============================================
// API to Get all Question =======================
//===================================================
testRouter.get('/:test_id/question', function(req, res, next) {
  test.findById(req.params.test_id).
  populate('questions').
  exec(function (err, tests) {
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }
  });
    });


//===============================================
// API to delete single question ==================
//===================================================
    testRouter.delete('/:test_id/questions/:question_id', function(req, res){
        question.findByIdAndRemove({_id: req.params.question_id}, function(err, tests){
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }

        });
    })


//=============================================
// API to get single question ====================
//===================================================
    testRouter.get('/questions/:question_id', function(req, res){
    question.findById({_id: req.params.question_id}, function(err, tests){
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }

        });
    });

//==============================================
// API to update current question ================
//===================================================
    testRouter.put('/questions/:questionId', function(req, res){
         question.findOneAndUpdate({_id: req.params.questionId},req.body, {new: true}, function(err, tests) {
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }

        })
    })

//=============================================
// Add all details in db =========================
//===================================================
testRouter.post('/:testId/questions/:questionId/answer', function(req, res){
  question.findById(req.params.questionId,function(err, question) {
    if(err){
        console.log('can not find question'+err)
    }
    else{
      var newanswer = new answer(req.body);
       newanswer.user = req.body.userId;
       newanswer.question =  req.body.questionId;
       newanswer.test = req.body.testId;
    }
    newanswer.save(function(err, tests){
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }

    })

  })

})

//=============================================
// API to get answer with userID & testId =======
//===================================================
testRouter.post('/:testId/answers', function(req, res){
console.log(req.body.userId)
  answer.find(
    { "$and" : [ {"user" : req.body.userId}, {"test" : req.params.testId } ] })
    .populate('question')
    .then((answers, err) => {
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(answers)
    }

  });
});

//===================================================
// API to get all question and answers by users  ====
//===================================================
    testRouter.get('/:testId/:userId/questions', function(req, res){
    console.log(req.params.userId)
  answer.find(
    { "$and" : [ {"user" : req.params.userId}, {"test" : req.params.testId } ] })
    .populate('question')
    .then((answers, err) => {
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(answers)
    }

      });
});


//==============================================
// API to update Attempted by question ============
//===================================================
    testRouter.put('/:testId/attemptedby', function(req, res){
  test.findByIdAndUpdate(
    mongoose.Types.ObjectId( req.params.testId ), 
    { $push: { testAttemptedBy : ObjectId(req.body.testAttemptedBy) } },
    function(err, tests){
    if (err){
        var error = resGenerator.generate(true, "Something is not working, error : " + err, 500, null);
        res.send(error)
    }else{
    res.send(tests)
    }

        })
    })



//===================================================
// use app level middleware =========================
//===================================================
app.use('/test', testRouter)
}