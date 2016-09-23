var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new mongoose.Schema({
  _user: {type:Schema.Types.ObjectId, ref: 'User'},
  _answer: {type:Schema.Types.ObjectId, ref: 'Answer'},
}, {timestamps: true});

mongoose.model('Like', LikeSchema);