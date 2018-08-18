function generateCurrentDate(fetchedDate){
	let convertedFetchedDate =  new Date(fetchedDate);
	let fetchedYear = convertedFetchedDate.getFullYear();
	let fetchedMonth = convertedFetchedDate.getMonth() + 1;
	let fetchedDay = convertedFetchedDate.getDate();
	let fetchedHour = convertedFetchedDate.getHours();
	let fetchedMin = convertedFetchedDate.getMinutes();

	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth() + 1;
	let currentDay = currentDate.getDate();
	let currentHour = currentDate.getHours();
	let currentMin = currentDate.getMinutes();

	if (
		fetchedMonth == currentMonth &&
		fetchedDay == currentDay &&
		fetchedYear == currentYear
	){
		let ampm = (fetchedHour >= 12) ? 'PM' : 'AM';
		if (fetchedHour >= 12) {
			ampm = 'PM';
			fetchedHour = fetchedHour - 12;
		}
		else {ampm = 'AM'};
		if (fetchedHour == 0) {fetchedHour = 12};
		if (fetchedMin < 10) {fetchedMin = `0${fetchedMin}`};
		let datestring = `Today, ${fetchedHour}:${fetchedMin} ${ampm}`;

		return datestring
	}

	if (
		fetchedMonth == currentMonth &&
		fetchedDay == currentDay - 1 &&
		fetchedYear == currentYear
	){ return 'Yesterday' }
	if (
		fetchedMonth == currentMonth &&
		fetchedDay !== currentDay &&
		fetchedYear == currentYear
	){ return `${currentDay - fetchedDay} days ago` }

	else {
		return `${fetchedMonth}/${fetchedDay}/${fetchedYear.toString().substr(-2)}`
	}
}



function getSelectionText() {
	if (selection) {
		if (selection.type == 'Range') {
			selectionString = selection.toString();
			selectionStartPos = selectionRange.startOffset;
			selectionEndPos = selectionRange.endOffset;

			start = selectionRange.startContainer;
			end = selectionRange.endContainer;

			let newformattingdiv = $('<div></div>').attr({id: 'formattingoptions'})

			newformattingdiv.append(generateFormattingButtonElements());
			$('#formattingoptionscontainer').html(newformattingdiv);
		}
		if (selection.type == 'Caret') {
			$('#formattingoptionscontainer').html('');
		}
	}
}

function formattingtoolsHandler() {
	$(document).on('click', '#headerbutton', function(){
		// TODO: Add all attributes to the newendpoint;
		// for (let i = 0; i < endselect.attributes.length - 1; i++){
		// }

		// let startselect = selectionRange.startContainer.parentNode;
		
		// let a = startselect;
		// let rangenodes = [];
		// while (a) {
		// 	if (a.tagName){
		// 		rangenodes.push(a);
		// 		a = a.nextSibling;
		// 	}
		// 	else {
		// 		break;
		// 	}
		// }

		// for (each of rangenodes){
		// 	let newelement = document.createElement("h2");
		// 	newelement.appendChild(each.firstChild);
		// 	each.replaceWith(newelement);
		// }
		let containerNode = selection.getRangeAt(0).commonAncestorContainer;
			// while (containerNode) {
			// 	console.log(containerNode.parentNode.tagName);
			// 	if (containerNode.parentNode.tagName == 'BLOCKQUOTE' || containerNode.parentNode.tagName == 'I') {
		
		if (containerNode.parentNode.tagName !== 'H3'){
			document.execCommand('FormatBlock', false, '<h3>');
		}
		else {
			document.execCommand("FormatBlock", false, '<p>');
		}

		// selectionRange.setStart(start, selectionStartPos);
		// selectionRange.setEnd(end, selectionEndPos);
		
		// selection.removeAllRanges();
		// selection.addRange(selectionRange);
	})

	$(document).on('click', '#subheaderbutton', function(){
		let containerNode = selection.getRangeAt(0).commonAncestorContainer;
		
		console.log(selection);
		if (containerNode.parentNode.tagName != 'H4'){
			document.execCommand('FormatBlock', false, '<h4>');
		}
		else {
			document.execCommand("FormatBlock", false, '<p>');
		}
	})

	$(document).on('click', '#boldbutton', function(){
		document.execCommand('StyleWithCSS', false, false);
		document.execCommand('bold');
	})

	$(document).on('click', '#linkbutton', function(){
		let newinput = $('<input type="text" />').attr({
			id: 'addressinput',
			placeholder: 'Type a link...'
		})
		let newform = $('<form></form>').attr({
			id: 'addressform'
		}).append(newinput);
		$('#formattingoptions').html(newform);
		$('#addressinput').focus();
		//document.execCommand('createLink', true, 'https://www.google.com');
		//addressinputHandler();
	})

	$(document).on('click', '#quotebutton', function(){

		//if (blockclicked == 0) {
			//document.execCommand('FormatBlock', true, '<blockquote>');
			//blockclicked = 1;
			
			
		//document.execCommand('FormatBlock', true, '<p>');

		let containerNode = selection.getRangeAt(0).commonAncestorContainer;
		if (containerNode.parentNode.tagName != 'BLOCKQUOTE'){
			let startselect = selectionRange.startContainer.parentNode;
			let endselect = selectionRange.endContainer.parentNode;
			// let p = document.createElement("p");
			// $('#texteditor').append(p);
		
			let a = startselect;
			let rangenodes = [];
			while (a) {
				if (a.tagName && a != endselect){
					console.log(a.tagName);
					rangenodes.push(a);
					a = a.nextSibling;
				}
				else {
					rangenodes.push(a);
					break;
				}
			}

			for (each of rangenodes){
				let newblockquote = document.createElement("blockquote");
				//let newp = document.createElement("p");
				//newp.appendChild(each.firstChild);
				//newblockquote.appendChild(newp);
				newblockquote.appendChild(each.firstChild);
				each.replaceWith(newblockquote);
			}

			selectionRange.setStart(start, selectionStartPos);
			selectionRange.setEnd(end, selectionEndPos);
		
			selection.removeAllRanges();
			selection.addRange(selectionRange);

			//$("<blockquote/>").insertBefore($("[contenteditable]").find("p:first")).append($("[contenteditable]").find("p"))

			//}

			// else {
			// 	document.execCommand('FormatBlock', true, '<p>');
			// 	blockclicked = 0;
			// }
		}

		else {
			let startselect = selectionRange.startContainer.parentNode;
			let endselect = selectionRange.endContainer.parentNode;
			// let p = document.createElement("p");
			// $('#texteditor').append(p);
		
			let a = startselect;
			let rangenodes = [];
			while (a) {
				if (a.tagName && a != endselect){
					console.log(a.tagName);
					rangenodes.push(a);
					a = a.nextSibling;
				}
				else {
					rangenodes.push(a);
					break;
				}
			}

			for (each of rangenodes){
				let newblockquote = document.createElement("p");
				//let newp = document.createElement("p");
				//newp.appendChild(each.firstChild);
				//newblockquote.appendChild(newp);
				newblockquote.appendChild(each.firstChild);
				each.replaceWith(newblockquote);
			}

			selectionRange.setStart(start, selectionStartPos);
			selectionRange.setEnd(end, selectionEndPos);
		
			selection.removeAllRanges();
			selection.addRange(selectionRange);

			//$("<blockquote/>").insertBefore($("[contenteditable]").find("p:first")).append($("[contenteditable]").find("p"))

			//}

			// else {
			// 	document.execCommand('FormatBlock', true, '<p>');
			// 	blockclicked = 0;
			// }
		}
		
		
		
		
	})

	$(document).on('click', '#italicizebutton', function(){
		document.execCommand('StyleWithCSS', false, false);
		document.execCommand('italic');
	})
}

function addressinputHandler(){
	$(document).on('submit', '#addressform', function(e){
		e.preventDefault;
		if ($('#addressinput').val()){
			address = $('#addressinput').val();
			
			let fulladdress = `https://${address}`;
			selectionRange.setStart(start, selectionStartPos);
			selectionRange.setEnd(end, selectionEndPos);
		
			selection.removeAllRanges();
			selection.addRange(selectionRange);
			document.execCommand('createLink', false, `https://${address}`);
			
		}
		return false;
	})
}

function nextNode(foo) {
	if (foo.hasChildNodes()) {
			return foo.firstChild;
	} else {
			while (foo && !foo.nextSibling) {
					foo = foo.parentNode;
			}
			if (!foo) {
					return null;
			}
			return foo.nextSibling;
	}
}

function loginRequest(query, callback){
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
		console.log('signed in');
		localStorage.setItem("token", result.authToken);
		renderLoggedInElements();
		$('.signinForm').html('');
	})
	.fail(err => {console.error(err)})
}

// TODO: Fix this part so that the first name appears on the page
function renderLoggedInElements(){
	if (localStorage.getItem('token') == null) {
		console.log($('.logoptionsdiv'));
		$('.logoptionsdiv').html(`<button class='loginbutton'>Sign In</button>`);
		$('.accountinfo').html('');

		//Generate the sign in form inside the left panel
		let signinformDiv = $('<div />', {'class': 'signinForm'});
		signinformDiv.html(generateSignInElements());
		$('.popover').html(signinformDiv);
	}
	else {
		fetchaccountData();
		fetchmessagesData();
		
		//$('.accountinfo').html(`<button class='settingsbutton'>Settings</button>`);
		$('.popover').html(generatePopoverElements());
	}
}

function settingsHandler(){
	$(document).on('click', '.settingsbutton', function() {
		// TODO: Fetch account data and let user modify & update it
		fetchaccountData();
	});
}

function fetchaccountData(){
	const SERVER_URL = '/api/accounts';
		const settings = {
			type: 'GET',
			url: SERVER_URL,
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			}
		};
		$.ajax(settings)
		.done(result => {
			$('.firstname').html(result.firstname);
			$('.logoptionsdiv').html(`<button class='logoutbutton'>Sign Out</button>`);
		})
		.fail(err => {console.error(err)})
}


function createAccount(query, callback){
	const SERVER_URL = '/api/accounts';
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

function fetchmessagesData(){
	const SERVER_URL = '/api/messages';
		const settings = {
			type: 'GET',
			url: SERVER_URL,
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			}
		};
		$.ajax(settings)
		.done(result => {
			//result.sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));
			let listofmessagescontainer = document.createElement('div');
			listofmessagescontainer.className = 'listofmessagescontainer';
			result.forEach(each => {
				listofmessagescontainer.insertAdjacentHTML('beforeend', generateMessagesList(each));
			});
			$('.messagescontainer').html(listofmessagescontainer);
		})
		.fail(err => {console.error(err)})
}

function watchSubmit(){
	$(document).on('submit', '#loginform', function(e){
		e.preventDefault();
		const emailqueryTarget = $(e.currentTarget).find('#loginemail');
		const passqueryTarget = $(e.currentTarget).find('#loginpassword');
		const emailquery = emailqueryTarget.val();
		const passquery = passqueryTarget.val();
		emailqueryTarget.val('');
		passqueryTarget.val('');
		let query = {emailquery, passquery};
		loginRequest(query, displaySignedInData);
	})

	$(document).on('submit', '#newaccountform', function(e){
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

function signinbuttonHandler(){
	$(document).on('click', '.loginbutton', function(){
		//TODO: When clicked just simply slide out the left panel
	})
}

function createaccountHandler(){
	$(document).on('click', '.createaccountLink', function(){
		$('.popover').html(generateCreateAccountElements());
	})

	$(document).on('click', '.signupLink', function(){
		$('.popover').html(generateSignInElements());
	})
}

function logoutRequest(){
	$(document).on('click', '.logoutbutton', function() {
		localStorage.clear();
		console.log(localStorage.getItem('token'));
		console.log('signed out: locstorage cleared!');
		$('.firstname').html('');
		renderLoggedInElements();
	})
}

let node
let selection;
let selectionRange;
let selectionString;
let deleteKeyCode = 8;
let enterKeyCode = 13;
let backtickKeyCode = 192;
let selectionEndPos;
let selectionStartPos;
let start;
let end;
let blockclicked = 0;
let address;
let profileinfo;
let timeoutId;
let currentmessageId;

function onchangedocumentHandler(){
	document.execCommand('defaultParagraphSeparator', false, 'p');

	$(document).on('selectionchange', function(e){
		var activeEl = document.activeElement;
		var activeEl_Id = activeEl ? activeEl.id.toLowerCase() : null;
		if (activeEl_Id == 'texteditor'){
			selection = window.getSelection();
			//selectionString = selection.toString();
			selectionRange = document.createRange();
			selectionRange = selection.getRangeAt(0);
			caretPos = selectionRange.endOffset;
			
			// selectionRange = selection.getRangeAt(0);
			// selectionRange.collapse(false);
			
			// selection.removeAllRanges();
			// selection.addRange(selectionRange);
			
			//selection = window.getSelection();
			
			// range = document.createRange();
			// range.setStart(startNode,startOffset);
			// range.setEnd(endNode,endOffset);
			// startRangeNode = range.startContainer;
	
			//node = selection.focusNode.parentNode;
			getSelectionText();

			// $(this).on('input keyup', function(e){
			// 	// TODO: run only when not navigational keys
			// 	console.log(e.type);
			// 	
			// })
		}
	});

	let editable = document.getElementById('texteditor');
	editable.addEventListener('input', function(e) {
		autosaveHandler();
	});

	$(document).on('keydown', '#texteditor', function(e){
		if (e.which == deleteKeyCode && $('#texteditor').children().first().text().length == 0 && caretPos == 0 && $('#texteditor').children().length == 1){
			e.preventDefault;
			return false;
		}

		if (e.which == enterKeyCode) {
			e.preventDefault;
			//console.log(selection.getRangeAt(0));
			let containerNode = selection.getRangeAt(0).commonAncestorContainer;
			//console.log(containerNode.parentNode.tagName);
			// while (containerNode) {
			// 	console.log(containerNode.parentNode.tagName);
			// 	if (containerNode.parentNode.tagName == 'BLOCKQUOTE' || containerNode.parentNode.tagName == 'I') {
			// 		containerNode = null;
			// 		console.log('we found the blockquote!!!');
			// 		//document.execCommand('InsertParagraph');
			// 		//document.execCommand('Outdent');
					
			// 		return false;
			// 	}
			// 	else{
			// 		break;
			// 	}
			// }

			// let elappendafter = containerNode.parentElement;
			// let newp = document.createElement('div');
			// let elparent = elappendafter.parentNode;
			// console.log(elparent);
			// console.log(elappendafter);
			// console.log(typeof newp)
			
			//document.execCommand('\n');


			//elparent.insertAdjacentElement('afterend', newp);

			//containerNode.parentElement.insertBefore(newp, containerNode.nextSibling);
			//newp.focus();
			containerNode.parentNode.tagName
			if (containerNode.parentNode.tagName == 'PRE') {
				console.log('enter was pressed from the pre block');
				// document.execCommand('Outdent');
				// document.execCommand("insertHTML", false, "<br />");	

				console.log(selectionRange);
				// newNode = document.createElement("br");
				
				// selectionRange.insertNode(newNode);
				//document.execCommand('InsertParagraph');
				//document.execCommand('Outdent');
				document.execCommand('FormatBlock', false, '<br><br>');
			}
			else {
				document.execCommand('InsertParagraph');
				document.execCommand('Outdent');
				document.execCommand('FormatBlock', false, '<p>');
			}
			return false;
		}

		if (e.which == backtickKeyCode) {
			document.execCommand('FormatBlock', false, '<pre>');
			document.execCommand('InsertParagraph');
			document.execCommand('Outdent');
			document.execCommand('FormatBlock', false, '<p>');
			selection.removeAllRanges();
			selection.addRange(selectionRange);
		}
	});
}

function hamburgerHandler() {
	$('.hamburgerbutton').on('click', function(){
		$('nav').toggleClass('hidehamburger');
		$('section').toggleClass('hidesection');
		
		// if ($(document.activeElement) && $(document.activeElement).attr('class')){
		// 	if ($(document.activeElement).attr('class').includes('hbtn-section')) {
		// 		$('.hbtn-popover').focus();
		// 	}
		// 	else if ($(document.activeElement).attr('class').includes('hbtn-popover')) {
		// 		$('.hbtn-section').focus();
		// 	}
		// }
	})
}

function autosaveHandler(){
	if (timeoutId) {
		clearTimeout(timeoutId);
		$('#texteditor').on('input', function(){
			$('.autosavestatus').html('Waiting...');
		});
	};
	timeoutId = setTimeout(function(){
		let titles = [];

		$('#texteditor').children().each(function(){
			if($(this).text().length > 0 && titles.length < 2){
				titles.push($.trim($(this).text()));
			}
		})
		
		let messageString = {
			//currentmessageId: currentmessageId,
			fullcontent: $('#texteditor').children(),
			// fullcontent: $('#texteditor').html(),
			title: titles[0] ? titles[0] : 'Untitled message',
			subtitle: titles[1] ? titles[1] : 'No subtitle'
		}

		if (currentmessageId) {
			putmessage(messageString, donothing);
		}
		else {
			postmessage(messageString, donothing);
		}
	}, 2000);
}

function donothing(){};

function popovermenuHandler(){
	$('#popovermessages').on('click', function(){
		fetchmessagesData();
	})
}

function savebuttonHandler(){
	$('#savebutton').on('click', function(){
		let titles = [];
		$('#texteditor').children().each(function(){
			if($(this).text().length > 0 && titles.length < 2){
				titles.push($.trim($(this).text()));
			}
		})
		let messageString = {
			fullcontent: $('#texteditor').children(),
			title: titles[0] ? titles[0] : 'Untitled message',
			subtitle: titles[1] ? titles[1] : 'No subtitle'
		}
		postmessage(messageString, donothing);
	})
}

function postmessage(query, callback){
	const SERVER_URL = '/api/messages';
	const settings = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem('token')
		},
		type: 'POST',
		url: SERVER_URL,
		data: JSON.stringify({
			fullcontent: query.fullcontent,
			title: query.title,
			subtitle: query.subtitle
		}),
		dataType: "json",
		contentType: "application/json",
		success: callback
	};
	$.ajax(settings)
	.done(result => {
		console.log(result);
		$('.autosavestatus').html('Saved');
		currentmessageId = result.id;
	})
	.fail(err => {console.error(err)})
}

function putmessage(query, callback){
	const SERVER_URL = '/api/messages';
	const settings = {
		headers: {
			Authorization: "Bearer " + localStorage.getItem('token')
		},
		type: 'PUT',
		url: SERVER_URL,
		data: JSON.stringify({
			currentmessageId: currentmessageId,
			fullcontent: query.fullcontent,
			title: query.title,
			subtitle: query.subtitle
		}),
		dataType: "json",
		contentType: "application/json",
		success: callback
	};
	$.ajax(settings)
	.done(result => {
		$('.autosavestatus').html('Updated');
		//currentmessageId = result.id;
	})
	.fail(err => {console.error(err)})
}

function loadmaster(){
	$('#texteditor').focus();
	onchangedocumentHandler();
	watchSubmit();
	renderLoggedInElements();
	signinbuttonHandler();
	createaccountHandler();
	settingsHandler();
	logoutRequest();
	formattingtoolsHandler();
	addressinputHandler();
	hamburgerHandler();
	popovermenuHandler();
	savebuttonHandler();
}

$(loadmaster);