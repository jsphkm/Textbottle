const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const messagesSchema = mongoose.Schema({
		account_id: {type: String, default: ''},
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
    title: {type: String, default: 'Untitled'},
    subtitle: {type: String, default: 'No subtitle'},
    fullcontent: {type: Object, default: ''}
})

messagesSchema.methods.serialize = function() {
	return {
		account_id: this.account_id,
		id: this._id,
		createdDate: this.createdDate || '',
		updatedDate: this.updatedDate || '',
		title: this.title || '',
		subtitle: this.subtitle || '',
		fullcontent: this.fullcontent
	};
};

const Messages = mongoose.model('Messages', messagesSchema);
module.exports = {Messages};