function generateCurrentDate(){
	n =  new Date();
	y = n.getFullYear();
	m = n.getMonth() + 1;
	d = n.getDate();
	document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}

function premarkupEventHandler(){
	$('textarea').on('keyup', function(){
		let content = $('.premarkupcontent').val();
		$('#content').html(marked(content));
	});
}

const SERVER_URL = '/api/auth/login';

function getDataFromServer(query, callback){
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
	.fail(err => console.err(err))
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