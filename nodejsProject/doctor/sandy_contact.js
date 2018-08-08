var connection = require('./db_sandy');

function getUUID(){	
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();	
}

function getTimeFromNow(MINUTE){
	var rtn_val = Date.now();
	
	return rtn_val;
}

//var re = new RegExp("[0-9]");
var re = /^[\u4e00-\u9fa5_\sa-zA-Z0-9]+$/; //中文 英文 數字 跟 底線 空白

var re_email = /[a-zA-Z0-9_]+@[a-zA-Z0-9\._]+/; //email

module.exports = {
	insert:function(req,res){
		
		var email = req.body.email;
		var company = req.body.company;
		var msg = req.body.msg;
		//console.log(req.body);		
		
		if (re_email.test(email)) {
			//console.log("id Valid");
		} else {
			res.json({err:'email 格式錯誤'});
			console.log("email Invalid:" + email);
			return;
		}
		
		if (re.test(company)) {
			//console.log("pw Valid");
		} else {
			res.json({err:'暱稱 格式錯誤'});
			console.log("company Invalid:" + company);
			return;
		}
		
		if (re.test(msg)) {
			//console.log("pw Valid");
		} else {
			res.json({err:'訊息 格式錯誤'});
			console.log("msg Invalid:" + msg);
			return;
		}
		
		var sql = "INSERT INTO sandy_contact (email, company,msg) VALUES ( ?,?,? )";
		connection.query(sql,[email,company,msg],function (err, result) {
			if (err){
				console.log("sandy_contact insert" + err);
				res.json({err:'sandy_contact fail'});
			}else{
				//console.log(result);
				res.json({msg:'OK'});
			}													
		});
	}
}
