$(document).ready(function(){
	$('#btn_ipSet').click(function(){
		$('#div_ipSet').toggle();
	});
	
	$('#btn_ipSetOK').click(function(){		
		var ip = $('#input_ip1').val() + "." + $('#input_ip2').val() + "." + $('#input_ip3').val() + "." + $('#input_ip4').val();
		var port = $('#input_ip5').val();
		setServerIP(ip,port)
	});	
	
	$("#btn_login").click(function(){
		//ajax的部分
		var postdata = new post_data_login($('#input_id').val(),$('#input_pw').val())
		var request = $.when(ajax_Post("User","Login",postdata)).done(function(data) {                                
				//alert(data.string);
				if(data.err){
					$('#login_msg').html(data.err).css('color','red');
				}else{
					$('#login_msg').html("嗨! " + data.id).css('color','green');
					
					setTimeout(switchHtml("main.html"),3000);
					
				}
			});
		
		request.onreadystatechange = null;
		request.abort = null;
		request = null;
        	
	});
	
	
	var post_data_login = function (id,pw){
		this.id = id;
		this.pw = pw;
	}
});