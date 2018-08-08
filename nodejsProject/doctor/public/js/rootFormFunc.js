var tool_bar = "<span id='tool_bar'>";
tool_bar += "<span onclick='node_ckb(this)' class='tool_btn ckb-icon'>核對方塊(Y/N)</span>";
tool_bar += "<span onclick='node_del(this)' class='tool_btn del-icon'>刪除</span>";
tool_bar += "<span onclick='node_add(this)' class='tool_btn add-icon'>新增</span>";
tool_bar += "<span onclick='node_addchild(this)' class='tool_btn addchild-icon'>新增子項</span>";
tool_bar += "</span>";			

var ckb = "<input type='checkbox' onchange='ckbChange(this);'>";
var formNode = "<div class='node' id='node-0'><span class='node-name'>點我輸入</span></div>";

var collapseMark = "[-]";
var uncollapseMark = "[+]";

function openFile(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      //alert(text);
      render_form(text);
      //console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
};

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function TreeToFlat(){
	$('#rootForm input:checkbox').remove();
	
	$('.node').each(function() {
		var ID = $(this).attr('id');
		var parentID = $(this).attr('data-parentID');
	    if(parentID){
	    	$(this).appendTo("#rootForm");			    	
	    }
	});
}

function FlatToTree(){
	$('.node').each(function() {
		var ID = $(this).attr('id');
		var isckb = $(this).attr('data-isckb');
		if(isckb =="Y"){
			var newCkb = $(ckb).clone(); 
			$(newCkb).insertBefore($(this).children('.node-name'));
			
			var checked = $(this).attr('data-checked');
			if(checked == "Y"){
				$(newCkb).prop('checked', true);
			}
			
		}
		
		var parentID = $(this).attr('data-parentID');
	    if(parentID){
	    	$(this).appendTo("#" + parentID);			    	
	    }	    
	});
}

function ckbChange(element) { //checkbox change
	var node = $(element).parent();
	if(element.checked){
		$(node).attr('data-checked','Y');
	}else{
		$(node).attr('data-checked','N');
	}
	
}

function node_ckb(element){ //toggle checkbox
	var node = $(element).parent().parent();
	var nodeID = $(node).attr('id');
	var parentNodeID = $(node).attr('data-parentid');
	var nodeName = $(element).parent().prev();
	
	var isckb = $(node).attr('data-isckb');
	if(isckb == "Y"){
		$(node).removeAttr('data-isckb');
	}else{
		$(node).attr('data-isckb','Y');
	}
	updateForm();
}

function node_del(element){	//刪除節點
	var node = $(element).parent().parent();
	var nodeID = $(node).attr('id');
	var parentNodeID = $(node).attr('data-parentid');
	var nodeName = $(element).parent().prev();
	$(node).remove();	
	resetChildID(parentNodeID);
	updateForm();
}


function node_add(element){	//新增同層節點
	var node = $(element).parent().parent();	
	var nodeID = $(node).attr('id');
	var parentNodeID = $(node).attr('data-parentid');
	var nodeName = $(element).parent().prev();	
	var newNode = $(formNode).clone();

	$(newNode).attr('data-parentid',parentNodeID);
	$(newNode).appendTo("#rootForm");
	
	resetChildID(parentNodeID);
	updateForm(true);
}

function node_addchild(element){	//新增下層節點
	var node = $(element).parent().parent();	
	var nodeID = $(node).attr('id');
	var parentNodeID = $(node).attr('data-parentid');
	var nodeName = $(element).parent().prev();	
	var newNode = $(formNode).clone();

	$(newNode).attr('data-parentid',nodeID);
	$(newNode).appendTo("#rootForm");
	
	resetChildID(nodeID);
	updateForm(true);
}



function resetChildID(parentID){ //重新給子節點 ID
	if(parentID){
		$("div[data-parentid=" + parentID + "]").each(function(index){
			//alert($(this).attr)
			var nodeID = parentID + "-" + index;
			
			$(this).attr('id',nodeID);
		});		
	}else{
		$("#rootForm>div").each(function(index){
			//alert($(this).attr)
			var nodeID = "node" + "-" + index;
			
			$(this).attr('id',nodeID);
		});
	}
}

function updateForm(){	//重新排列表單
	unrender_form(false);
	render_form($('#rootForm').html());
}

function resetFocus(node){
	$('#tool_bar').remove();			
		
	$('.focus-node').removeClass('focus-node');
	if(node){
		$(node).addClass('focus-node');
		$(tool_bar).insertAfter(node);	
		$(node).attr('contentEditable', true);
	}else{
		$('.node-name').removeAttr('contentEditable');
	}
}
	
function render_form(content){						
	$('#rootForm').html(content);						
	FlatToTree();	
		debugger;
	bind_event();			
}		

function unrender_form(newFormFlag){
	if(newFormFlag){
		resetFocus(false);
	}
	removeToggleIcon();								
	TreeToFlat();
}

function bind_event(){
	$('.node').each(function(){
		var child_count = $(this).children('div').length;
		if(child_count > 0){
			$( "<span onclick='toggle_node(this)' class='toggle-icon'>" +collapseMark + "</span>" ).prependTo($(this));											
		}
	});
	
	$('.node').bind('click', function(e) {
		if (e.target !== this)
		    return;
		resetFocus($(this).children('.node-name'));					
	});
	
	$('.node-name').bind('click', function(e) {		
		resetFocus($(this));					
	});
}

function removeToggleIcon(){
	$('.toggle-icon').remove();
//	$('.toggle-icon').each(function(){
//		console.log($(this).html());
//	});
}

function toggle_node(element){
	$(element).parent().children('div').toggle();
	if($(element).parent().children('div').is(":visible")){		
		toggle_icon(element,true);				
	}else{
		toggle_icon(element,false);
	}
}

function toggle_icon(element,collapseFlag){
	if(collapseFlag){
		$(element).html(collapseMark);
	}else{
		$(element).html(uncollapseMark);
	}
}