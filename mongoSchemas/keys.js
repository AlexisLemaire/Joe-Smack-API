const mongoose = require('mongoose');
const schema = mongoose.Schema({
	key: { type: String, required: true },
});
module.exports = mongoose.model('keys', schema);
