//======================================
// Get the required packages ===========
//======================================
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

//======================================
//define a schema ======================
//======================================
var Schema = mongoose.Schema;

//======================================
// Make Instance Of AnswerSchema =======
//======================================

var AnswerSchema = new Schema({
            user: [{type: Schema.Types.ObjectId,
                ref: 'user'}],
            test: [{type: Schema.Types.ObjectId,ref: 'test'}],
            question: [{type: Schema.Types.ObjectId, ref: 'question'}],
            userAnswer: {type: String},
            correctAnswer: {type: String},
            timeTakenEach: {type: Number,default: 1}  //insecs
});

mongoose.model('answer', AnswerSchema);
