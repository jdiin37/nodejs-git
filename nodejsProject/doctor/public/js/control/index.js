$(document).ready(function(){		
	if(true){
		switchHtml("login.html");
	}else{
		
	}
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//Great success! All the File APIs are supported.
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
	
	function iniContact(){
		$('#contact_email').val('');
		$('#contact_company').val('');
		$('#contact_info').val('');
		$('#btn_contact').prop("disabled", true);
		setTimeout($('#btn_contact').prop("disabled", false),3000);
					
	}
	
	
	$("#btn_contact").click(function(){
		//ajax的部分
		var postdata = new post_data_contact_insert($('#contact_email').val(),$('#contact_company').val(),$('#contact_info').val())
		var request = $.when(ajax_Post("sandy_contact","insert",postdata)).done(function(data) {                                
				//alert(data.string);
				if(data.err){
					$('#contact_msg').html(data.err).css('color','red');
				}else{
					$('#contact_msg').html("thank you! I will reply as soon as posible ").css('color','green');
					
					iniContact();
					
					//setTimeout(switchHtml("main.html"),3000);
					
				}
			});
		
		request.onreadystatechange = null;
		request.abort = null;
		request = null;
        	
	});
	
	
	var post_data_contact_insert = function (email,company,msg){
		this.email = email;
		this.company = company;
		this.msg = msg;
	}
	
	
});