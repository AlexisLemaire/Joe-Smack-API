const mongoose = require('mongoose');
const schema = mongoose.Schema({
	title: { type: String, required: true },
    type: { type: String, required: true },
    prix: { type: String, required: true },
    ingredients: { type: Array, required: false },
    text: { type: String, required: false },
    imgName: { type: String, required: false }
});
module.exports = mongoose.model('recettes', schema);
