var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
  _user: {type:Schema.Types.ObjectId, ref: 'User'},
  _question: {type:Schema.Types.ObjectId, ref: 'Question'},
  likes: [{type: Schema.Types.ObjectId, ref:'Like'}],
  answer: String,
  details: String
}, {timestamps: true});

mongoose.model('Answer', AnswerSchema);