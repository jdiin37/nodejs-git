const express = require('express');
const path = require("path");
const app = express(); //建立一個Express伺服器

var bodyParser = require('body-parser');
//var multer = require('multer'); 

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.use(express.static(path.join(__dirname, 'public')));



var html_dir = './public/';

app.get('/', function (req, res) {
  res.send('<h1>首頁</h1>');
});

app.get('/index',function(req, res) {
	res.sendfile(html_dir + 'index.html');
});


var user = require('./user');
app.post('/User/Login',user.login);


var sandy_contact = require('./sandy_contact');
app.post('/sandy_contact/insert',sandy_contact.insert);

app.listen(3000, function () {
  console.log('Example app is running on port 3000!');}
);