var config = require('./config.js');

var express = require('express');
var session = require('express-session');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

var mustache = require('mustache-express');
app.engine('html', mustache());
app.set('view engine', 'html');

app.set('views', __dirname+"/views");

app.use(express.static(__dirname+"/public"));

var cors = require('cors');
app.use(cors());
app.options("*", cors());

app.use(session({
	secret : 'monSuperSecretDeLaMortquiTue',
	resave : false,
	saveUninitialized: true 
}));

var CASAuthentication = require('cas-authentication');
var cas = new CASAuthentication({
	cas_url         : 'https://cas.utc.fr/cas',
	service_url     : 'http://92.222.5.101:9797',
	cas_version     : '2.0',
	renew           : false,
	is_dev_mode     : false,
	dev_mode_user   : '',
	dev_mode_info   : {},
	session_name    : 'cas_user',
	session_info    : 'cas_userinfo',
	destroy_session : false
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", cas.bounce, function (req, res, err){

	var sql = "SELECT * FROM `users` WHERE login=" + connection.escape(req.session.cas_user);
	console.log("SQL:", sql);


	connection.query(sql, function (err, results){
		console.log("Resutls:", results);
		if(err){
			res.send(err);
			console.log(err);
			return;
		}

		if(results.length > 1){
			res.sendStatus(403);
			res.end();
			return;
		}

		if(results.length == 0){
			console.log("Entered results.length==0");
			sql = "INSERT INTO `users` (login, gcm_registration) VALUES ("+connection.escape(req.session.cas_user)+ ", NULL);";
			connection.query(sql, function (err, results_insert){
				if(err){
					res.send(err);
					console.log("Error in insert: ", err);
					return;
				}


				res.render("index", {
					user:{
						login: req.session.cas_user,
						name: req.session.cas_userinfo.displayname
					},
					money:{
						user: req.session.cas_user,
						debt: 0,
						profit: 0,
						balance: 0,
						color: "green"
					}
				});

				return;
			});

		}

		if(results.length == 1){
			console.log("Entered results.length == 1");
			res.render("index", {
					user:{
						login: req.session.cas_user,
						name: req.session.cas_userinfo.displayname
					},
					money:{
						user: req.session.cas_user,
						debt: 3598 / 100,
						profit: 457/100,
						balance: ((457 - 3598)/ 100),
						color: "red"
					}
				});
			return;
		}

		res.sendStatus(200);
		res.send({
			error:{
				message: 'Unknown error, please come back in a little while',
				code: 1
			}
		});
		res.end();
		return;
	});
});

app.get("/admin", cas.block, function (req, res, err){
	res.render("admin", {

	});
});


app.get("/logout", cas.logout);

app.post("/transaction/new", function (req, res, err){
	var payer_id = req.body.payer_id;
	var debtFor = req.body.debt;
	var transaction_amount = req.body.transaction_amount;

	var res = {};

	var sql = "INSERT INTO `payments` (id, payer, price) VALUES (0," + connection.escape(payer_id) + " ," + connection.escape(transaction_amount) + ");";
	connection.query(sql, function (err,results){
		if(err){
			error(err);
			return;
		}else{
			res.success = true;
		}
	});

	sql = "INSERT INTO `payments` ()"

});

app.listen(9797, function(){
	console.log("Listening!");
});