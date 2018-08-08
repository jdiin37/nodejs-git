// file API

var global_file = {};

//function's start
function set_global_file(key,value){
	global_file[key] = value;
	
	if(key == 'colModel'){
		for(i = 0;i < global_file[key].length;i++){
			var column = '<div>' + global_file[key][i].name + '</div>';
			debugger;
			$('.column_unselect').append(column);
			
		}
	}
}

function init_global_file(){
	
	global_file = {};	
	$('.file-dialog').val('');
	
	
	$('#nav-base-tab').tab('show');
	
	$('.column_unselect').html('');
	$('.column_select').html('');
		
	$('#file_name').html('');
	$('#file_size').html('');
	
}

function get_global_file(key){
	return global_file[key];
}

function iniPage(){
	$('#tool_bar2').addClass('disabledDiv');
	$('#dataContent_zone').html('').hide();
	
	init_global_file();
}

function render_file_jexcel(){
	if(global_file.size){
		$('#file_name').html(global_file.name);
		$('#file_size').html(global_file.size);
		var data = jexcelData(global_file.content);
		
		//console.log(data);
		
		$('#myExcel').jexcel({
			data:data,
			colWidths: [70, 100, 70],
		});
		
	}else{
		setTimeout(function(){
			console.log("wait");
			render_file();
		}, 200);
	}		
}

function render_file_jqgrid(){
	if(global_file.size){
		$('#file_name').html(get_global_file('name'));
		$('#file_size').html(get_global_file('size'));
		
		
		set_global_file('colModel',csvJSON_getColModal(global_file.content));
		set_global_file('data',csvJSON(global_file.content));
					
	
		$('#dataContent_zone').html('').show().append('<table id="myGrid"></table>');
		render_jqgrid('myGrid',get_global_file('colModel'),get_global_file('data'));
		$('#tool_bar2').removeClass('disabledDiv');			
		
	}else{
		setTimeout(function(){
			console.log("wait");
			render_file();
		}, 200);
	}		
}


function openFileCSV(event) {
    var input = event.target;
    var reader = new FileReader();	
	
    reader.onload = function(){
		var text = reader.result;
	  
		set_global_file('content',text)
		$('#nav-base-tab').tab('show');
		render_file_jqgrid();
    };
	set_global_file('name',input.files[0].name);
	set_global_file('size',input.files[0].size);

    reader.readAsText(input.files[0]);	
};

function download_(data, filename, type) {
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

//chart 
function test_chart(){
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['tom', 'john', 'apple', 'ted', 'mary', 'amy', 'tony stork'],
            datasets: [
              {
                label: 'math',
                backgroundColor: '#f87979',
                borderColor: '#f87979',
                fill: false,
                data: [40, 39, 10, 40, 39, 80, 40],

              },
              {
                label: 'english',
                backgroundColor: 'green',
                borderColor: 'green',
                fill: false,
                data: [10, 26, 30, 18, 21, 60, 46],

              },
              {
                label: 'chinese',
                backgroundColor: 'blue',
                borderColor: 'blue',
                fill: false,
                data: [56, 78, 45, 36, 29, 30, 46],

              }
            ]
		},
		options: {
		}
	});

}
//function's end

$('#btn_logout').click(function(){
		switchHtml("login.html");	
});

$('.dropdown-menu').click(function(e){
	if($(this).css('display')){
		e.stopPropagation();
	}		
});

$("#menu-box > div").click(function(e){
		
	$('#dropBox1 > .dropdown-toggle').dropdown('toggle');
	if($(this).attr('id') == "open_csv"){		
		$( "#fileInput_csv" ).trigger( "click" );
	}	
	
	if($(this).attr('id') == "close_file"){
		iniPage();
	}		
});

iniPage();
test_chart();

//modal init
$(document).on('click','#Modal_baseData .btn-OK',function(event) {	
	//what to do
});

$('#Modal_baseData').on('show.bs.modal', function (event) { //彈跳視窗 跳出時

	
		
  //modal.find('.modal-title').text('New message to ' + recipient)
  //modal.find('.modal-body input').val(recipient)
});

