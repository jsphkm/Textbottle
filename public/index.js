'use strict';

function generateCurrentDate(){
	let n =  new Date();
	let y = n.getFullYear();
	let m = n.getMonth() + 1;
	let d = n.getDate();
	document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

function premarkupEventHandler(){
	$('textarea').on('keyup', function(){
		let content = $('.premarkupcontent').val();
		$('#content').html(marked(content));
	});
}



function getDataFromServer(query, callback){
	const SERVER_URL = 'api/auth/login';
	const settings = {
		url: SERVER_URL,
		data: {
			email: query[0],
			password: query[1]
		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings)
	.done(result => {console.log(result)})
	.fail(err => {console.error(err)})
}


function renderResult(item){
	console.log(item);
}

function displaySignedInData(data){
	const results = data.items.map((item, index) => renderResult(item));
  //$('.js-search-results').html(results);
}

function watchSubmit(){
	$('#loginform').on('submit', function(e){
		e.preventDefault();
		const emailqueryTarget = $(e.currentTarget).find('#email');
		const passqueryTarget = $(e.currentTarget).find('#password');
		const emailquery = emailqueryTarget.val();
		const passquery = passqueryTarget.val();
		emailqueryTarget.val('');
		passqueryTarget.val('');
		let query = {emailquery, passquery};
		getDataFromServer(query, displaySignedInData);
	})
}

function loadmaster(){
	generateCurrentDate();
	premarkupEventHandler();
	watchSubmit();
}

$(loadmaster);