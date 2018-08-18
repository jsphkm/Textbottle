function generateCreateAccountElements(){
	return `
	<div class='signcontainer'>
		<fieldset>
			<legend>Sign up</legend>
			<div class='signinDiv'>
				or <a class='signupLink'>sign in to your account</a>
			</div>
			<form id='signupform' method=post action='#'>
				<label for='firstname'></label>
				<input name='given-name' id='firstname' type='text' placeholder='First name' required autocomplete="given-name">
				<label for='lastname'></label>
				<input name='family-name' id='lastname' type='text' placeholder='Last name' required autocomplete='family-name'>
				<label for='email'></label>
				<input name='email' id='email' type='text' placeholder='Email' required autocomplete='home email'>
				<label for='password'></label>
				<input name='pass' id='password' type='password' placeholder='Password' required autocomplete='new-password'>
				<label for='confpassword'></label>
				<input name='pass' id='confpassword' type='password' placeholder='Confirm password' required autocomplete='current-password'>
				<button>Sign up</button>
			</form>
		</fieldset>
	</div>
	`
}

function generateSignInElements(){
	return `
	<div class='signcontainer'>
		<fieldset>
			<legend>Sign in</legend>
			<div class='createaccountDiv'>or <a class='createaccountLink'>create an account</a></div>
			<form id='loginform' method=post action='#'>
					<label for='loginemail'></label>
					<input id='loginemail' type='text' placeholder='Email' required>
					<label for='loginpassword'></label>
					<input id='loginpassword' type='password' placeholder='Password' required>
					<button>Sign in</button>
			</form>
		</fieldset>
	</div>
	`
}

function generateFormattingButtonElements(){
	return `
	<button id='boldbutton'>B</button>
	<button id='italicizebutton'>i</button>
	<button id='linkbutton'>href</button>
	<button id='headerbutton'>T</button>
	<button id='subheaderbutton'>T</button>
	<button id='quotebutton'>&#8220;quote&#8221;</button>
	`
}

function generatePopoverElements(){
	return `
	<div class='popover-inner'>
		<div class='spacer'></div>
		<ul role='menu'>
			<li class='list-item'>
				<a id='popovermessages' role='menuitem'>Writings</a>
				<li class='list-item list-item-separator'></li>
				<div class='messagescontainer'></div>
			</li>
			
			<li class='list-item'>
				<div class='logoptionsdiv' role='menuitem'></div>
			</li>
		</ul>
	</div>
	`
}

function generateAccountInfoElements(){
	return `
	<div class='accountinfo-wrapper'>

	</div>
	`
}

function generateMessagesList(each){
	let datestring = generateCurrentDate(each.updatedDate);
	return `
	<div class='summary-list'>
		<div>
			<div class='messages-title'>${each.title}</div>
			<div class='messages-subtitle'>${each.subtitle}</div>
		</div>
		<div class='messages-updatedDate'>${datestring}</div>
	</div>
	<li class='list-item list-item-separator'></li>
	`
}