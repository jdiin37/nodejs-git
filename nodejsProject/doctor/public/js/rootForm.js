$(function() {
	 //alert("test"); 
	flatHtml = "<div class='node' id='node-0' data-isckb='Y' data-checked='Y'><span class='node-name'>HAHAHA</span></div>";
	flatHtml += "<div class='node' id='node-0-0' data-parentID='node-0'><span class='node-name'>joe</span></div>";
	flatHtml += "<div class='node' id='node-0-1' data-parentID='node-0'><span class='node-name'>john</span></div>";
	flatHtml += "<div class='node' id='node-0-0-0' data-parentID='node-0-0'><span class='node-name'>LALALA</span></div>";
	
	render_form(formNode);			 			 
	
	$('#btn-sava').click(function(){				
						
		unrender_form(true);
		$('.node').removeAttr('style');
		var flatHtml = $('#rootForm').html();
		//console.log($('#root').html());
		//$('#flatHtml').text(flatHtml);
		download(flatHtml,'test.txt','text/plain');
		render_form(flatHtml);
	});
	
	$('#btn-newForm').click(function(){
		render_form(formNode);
	});
});