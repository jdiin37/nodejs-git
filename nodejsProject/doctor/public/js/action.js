function switchHtml(htmlFile){
	$("#root").load(htmlFile);
}

//

//----ajax
function ajax_Post(api,method,dataObj){
	return $.ajax({
		type: "POST",
		url: "/" + api + "/" +method,
		contentType: 'application/json; charset=UTF-8',
		data:JSON.stringify(dataObj),
		dataType: "json",
		error: function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status==500){  //500 Error
				alert(" 500 Error ");
			}   
		}
	});
}

function ajax_Get(api,method){
	return $.ajax({
		type: 'GET',
		url: "/" + api + "/" +method,
		contentType: 'application/json; charset=UTF-8',
		dataType: "json",
		error: function(jqXHR, textStatus, errorThrown) {
			if(jqXHR.status==500){  //500 Error
				alert(" 500 Error ");
			}   
		}
	});
}


function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

function csvJSON_getColModal(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i = 0;i<headers.length;i++){
	var obj = {};
	obj['name'] = headers[i];	//欄位名稱
	obj['width'] = headers[i].length * 25; //欄位寬度
	result.push(obj);
  }
  
  return result; //JavaScript object
}


function render_jqgrid(id,nail_colModel,nail_data){
	//debugger;
	//$("#" + id).html('');
	$("#" + id).jqGrid({
		colModel: nail_colModel,
		data: nail_data,
		
		guiStyle: "bootstrap4",
		iconSet: "fontAwesome",
		pager: true,
		rowNum:15,
		viewrecords: true,
		threeStateSort: true,
		searching: { defaultSearch: "cn" },
		
		loadComplete:function(){
			//autoresizeOnLoad: true;
			//console.log('fds');
		}
	}).jqGrid('filterToolbar');
}

function jexcelData(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var arr = [];
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  arr[j] = currentline[j];
	  }

	  result.push(arr);

  }
  
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

