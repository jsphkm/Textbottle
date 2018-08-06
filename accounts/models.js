const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const accountSchema = mongoose.Schema({
	firstname: {type: String, required: true, default: ''},
	lastname: {type: String, required: true, default: ''},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

accountSchema.methods.serialize = function() {
	return {
		id: this._id,
		firstname: this.firstname || '',
		lastname: this.lastname || '',
		email: this.email || '',
		password: this.password
	};
};

accountSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

accountSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 12);
};

const Accounts = mongoose.model('Accounts', accountSchema);
module.exports = {Accounts};