const mongoose = require('mongoose');
const schema = mongoose.Schema({
	pseudo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
module.exports = mongoose.model('users', schema);
