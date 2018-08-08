var connection = require('./db');

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

var re = new RegExp("^([a-z0-9]{5,})$");

module.exports = {
	login:function(req,res){
		
		var id = req.body.id;
		var pw = req.body.pw;
		//console.log(req.body);		
		
		if (re.test(id)) {
			//console.log("id Valid");
		} else {
			res.json({err:'id 格式錯誤'});
			console.log("id Invalid:" + id);
			return;
		}
		
		if (re.test(pw)) {
			//console.log("pw Valid");
		} else {
			res.json({err:'pw 格式錯誤'});
			console.log("pw Invalid:" + pw);
			return;
		}
		
		//var sql = "SELECT * FROM doc_user Where status = 'Y' and id = '" + id + "' and pw = '" + pw + "'";	
		var sql = "SELECT * FROM doc_user Where status = 'Y' and id = ? and pw = ?";	
		
		connection.query(sql,[id,pw] ,function(err, rows, fields) {
			if (err) {
				console.log('error when connecting to db:', err);
			}else{
				if(rows[0]){
									
					var uuid = getUUID();
					res.json({id:rows[0].id,session_id:uuid});
					
					/* var sql = "INSERT INTO doc_session (session_id, user,dead_time) VALUES ( '" + uuid + "','" + rows[0].id + "', now() + INTERVAL 30 MINUTE)";
					connection.query(sql, function (err, result) {
						if (err){
							console.log("err session insert" + err);
							res.json({err:'無法取得 session_id'});
						}else{
							//console.log(result);
							res.json({id:rows[0].id,session_id:uuid});
						}													
					});
					*/
					
				}else{
					res.json({err:"帳號密碼有誤"});
				}
			}			
		});
	},
	logout:function(req,res){
		//connecting.
	}
}
