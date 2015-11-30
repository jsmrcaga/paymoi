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
	res.render("index", {
	});
	// console.log(req.session.cas_user);
	// console.log(req.session);
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