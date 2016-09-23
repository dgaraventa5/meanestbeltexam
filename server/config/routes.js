var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
var answers = require('../controllers/answers.js');
var likes = require('../controllers/likes.js');

module.exports = function(app){
	
	app.post('/users', users.register);
	app.post('/login', users.login);
	app.get('/current_user', users.current_user);
	app.use(userAuth);
	app.get("/questions", questions.index);
	app.post("/questions", questions.create);
	app.get("/questions/:id", questions.show);
	app.post("/answers/:id", answers.create);
	app.post("/like_answer/:id", likes.like_answer);
	app.get("/logout", users.logout);
}
function userAuth(req,res,next){
	if (req.session.user){
		next();
	}else{
		res.sendStatus(401);
	}
}