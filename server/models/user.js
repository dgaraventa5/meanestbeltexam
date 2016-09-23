var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  questions: [{type: Schema.Types.ObjectId, ref:'Question'}],
  answers: [{type: Schema.Types.ObjectId, ref:'Answer'}],
  likes: [{type: Schema.Types.ObjectId, ref:'Like'}]
}, {timestamps: true});

mongoose.model('User', UserSchema);