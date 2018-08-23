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

function generatePanelElements(){
	return `
	<div class='panel-inner'>
		<ul role='menu'>
			<li class='list-item'>
				<div id='panel-title-writings' role='menuitem'>Account</div>
				<div class='account-items-container'></div>
			</li>
			<li class='list-item'>
				<div id='panel-title-writings' role='menuitem'>Writings</div>
				<div class='writings-items-container'></div>
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
	<div class='summary-list' data-message-id='${each.id}'>
		<div>
			<div class='messages-title'>${each.title}</div>
			<div class='messages-subtitle'>${each.subtitle}</div>
		</div>
		<div class='messages-updatedDate'>${datestring}</div>
		<div class='delete-button-container'><button class='delete-button' tabindex='-1'><img class='delete-img' src='/img/white-delete-icon.svg'/></button></div>
	</div>
	
	<li class='list-item list-item-separator'></li>
	`
}

function generateIntroTexteditorElements(){
	return `
	<h3 class="article_title" placeholder="New Title">Textbottle</h3>
	<h4>A beautiful way to write your ideas</h4>
	<p></p><blockquote>We write to taste life twice, in the moment and in retrospect - Anaïs Nin</blockquote><p></p>
	<h3>It's About Your Writing</h3>
	<p>This is an <a href="https://https://en.wikipedia.org/wiki/WYSIWYG">WYSIWYG</a> editor, which means that <i><b>autoformatting</b></i> is applied in this editing space.&nbsp; It is a connected way to visualize your writing.&nbsp;&nbsp;</p>
	<p>All your writings will be saved automatically and will be accessible in the <i>left panel</i> after you log in or sign up.</p>
	`
}

function generateNewTexteditorElements(){
	return `
	<h3 class='article_title' placeholder='New Title'></h3>
	`
}

function generateSignOutElements(result){
	return `
	<div id='signoutfullname'>${result.firstname} ${result.lastname}</div>
	<div id='signoutemail'>${result.email}</div>
	<button class='logoutbutton' tabindex='-1'>Sign Out</button>
	`
}