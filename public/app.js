let MOCK_MESSAGES = {
	"messages": [
		{
			"id": "1",
			"title": "title1",
			"content": "content1",
			"date": "111"
		},
		{
			"id": "2",
			"title": "title2",
			"content": "content2",
			"date": "222"
		},
		{
			"id": "3",
			"title": "title3",
			"content": "content3",
			"date": "333"
		}
	]
};

function getMessages(callbackFn) {
	setTimeout(function(){
		callbackFn(MOCK_MESSAGES)
	}, 1);
}

function displayMessages(data) {
	for (index in data.messages) {
		$('body').append(
			'<p>' + data.messages[index].content + '</p>'
		);
	}
}

function getAndDisplayMessages() {
	getMessages(displayMessages);
}

$(function() {
	getAndDisplayMessages();
})