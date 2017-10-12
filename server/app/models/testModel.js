//======================================
// Get the required packages ===========
//======================================
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
// var question = mongoose.model('question');
// var user = mongoose.model('user');


//======================================
//define a schema ======================
//======================================
var Schema = mongoose.Schema;

//======================================
// Make Instance Of ticketSchema =======
//======================================
var testSchema = new Schema({
    testName: {type: String, required: true},
    testCategory: {type: String, required: true},
    totalScore: {type: Number, default: 50, required: true},
    totalQuestions: {type: Number,default: 5},
    timeLimit:{type: Number, default: 30},
    createdAt: { type: Date, default: Date.now },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
      }],
   testAttemptedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }],


});


//======================================
// Define all models ===================
//======================================
mongoose.model('test', testSchema);
