var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
  _user: {type:Schema.Types.ObjectId, ref: 'User'},
  answers: [{type: Schema.Types.ObjectId, ref:'Answer'}],
  question: String,
  description: String
}, {timestamps: true});

mongoose.model('Question', QuestionSchema);