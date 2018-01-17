var express = require('express');
var router = express.Router();
var DemoModel = require("../model/User");


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', {});
});

router.post('/api/loginajax', function(req, res, next) {
	var username = req.body.username;
	var psw = req.body.psw;
	var verify = req.body.verify;
	var result = {
		code: 1,
		message: '登录成功！'
	};
	DemoModel.find({username: username, psw: psw, verify: verify}, function(err, docs){ 
		console.log(docs)
		if(docs.length == 0){
			result.code = -101;
			result.message = "登陆失败， 请修改用户名或密码。";
		}
		res.json(result);
	})
});

// router.post('/api/loginajax', function(req, res, next) {
// 	var username = req.body.username;
// 	var psw = req.body.psw;
// 	var result = {};
// 	if(username=='admin' && psw=='h5h5'){
// 		result.code = 1;
// 		result.message = '登录成功！';
// 	}else{
// 		result.code = -110;
// 		result.message = '用户名或密码不正确，请重新登录。';
// 	}
// 	res.json(result);
// });

router.get('/list', function(req, res, next) {
	res.render('list', {});
});

router.get('/list-ecshop', function(req, res, next) {
	res.render('list-ecshop', {});
});

router.get('/list-addgoods', function(req, res, next) {
	res.render('list-addgoods', {});
});

module.exports = router;
