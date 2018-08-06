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
	const SERVER_URL = '/api/auth/login';
	const settings = {
		type: 'POST',
		url: SERVER_URL,
		data: JSON.stringify({
			username: query.emailquery,
			password: query.passquery
		}),
		dataType: "json",
  	contentType: "application/json",
		success: callback
	};
	$.ajax(settings)
	.done(result => {
		console.log(result)
		localStorage.setItem("token", result.authToken);
		renderLoggedInElements();
	})
	.fail(err => {console.error(err)})
}

function renderLoggedInElements(){
	if (localStorage.getItem('token') !== null) {
		console.log('logged in!');
		$('.logoptionsdiv').html(`<button class='logoutbutton'>Sign Out</button>`);
		console.log('logout button loaded!');
		clearLocalStorage();
	}
	else {
		$('.logoptionsdiv').html(`<button class='loginbutton'>Sign In</button>`);
	}
}

function createAccount(query, callback){
	const SERVER_URL = '/api/users';
	const settings = {
		type: 'POST',
		url: SERVER_URL,
		data: JSON.stringify({
			firstname: query.firstnamequery,
			lastname: query.lastnamequery,
			email: query.emailquery,
			password: query.confpassquery
		}),
		dataType: "json",
		contentType: "application/json",
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
	//const results = data.items.map((item, index) => renderResult(item));
  //$('.js-search-results').html(results);
}

function watchSubmit(){
	$('#loginform').on('submit', function(e){
		e.preventDefault();
		const emailqueryTarget = $(e.currentTarget).find('#loginemail');
		const passqueryTarget = $(e.currentTarget).find('#loginpassword');
		const emailquery = emailqueryTarget.val();
		const passquery = passqueryTarget.val();
		emailqueryTarget.val('');
		passqueryTarget.val('');
		let query = {emailquery, passquery};
		getDataFromServer(query, displaySignedInData);
	})

	$('#newaccountform').on('submit', function(e){
		e.preventDefault();
		const firstnamequeryTarget = $(e.currentTarget).find('#firstname');
		const lastnamequeryTarget = $(e.currentTarget).find('#lastname');
		const emailqueryTarget = $(e.currentTarget).find('#email');
		const passqueryTarget = $(e.currentTarget).find('#password');
		const confpassqueryTarget = $(e.currentTarget).find('#confpassword');
		const firstnamequery = firstnamequeryTarget.val();
		const lastnamequery = lastnamequeryTarget.val();
		const emailquery = emailqueryTarget.val();
		const confpassquery = confpassqueryTarget.val();
		firstnamequeryTarget.val('');
		lastnamequeryTarget.val('');
		emailqueryTarget.val('');
		passqueryTarget.val('');
		confpassqueryTarget.val('');
		let query = {firstnamequery, lastnamequery, emailquery, confpassquery};
		createAccount(query, displaySignedInData);
	})
}

function clearLocalStorage(){
	$('.logoutbutton').on('click', function() {
		localStorage.clear();
		console.log('locstorage cleared!');
		renderLoggedInElements();
	})
}

function loadmaster(){
	generateCurrentDate();
	premarkupEventHandler();
	watchSubmit();
	renderLoggedInElements();
}

$(loadmaster);