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

var QuestionSchema = new Schema({
                    question: { type: String},
                    optionA: { type: String },
                    optionB: { type: String},
                    optionC: { type: String },
                    optionD: { type: String},
                    answer  :{type:String}
});


mongoose.model('question', QuestionSchema);
