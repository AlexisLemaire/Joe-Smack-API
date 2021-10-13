const mongoose = require('mongoose');
const schema = mongoose.Schema({
	title: { type: String, required: true },
    type: { type: String, required: true },
    text: { type: String, required: false },
    ingredients: { type: Array, required: false },
    imgName: { type: String, required: false },
    prix: { type: Number, required: true },
    prepDuration: { type: Number, required: true },
    nbPersonnes: { type: Number, required: true }
});
module.exports = mongoose.model('recettes', schema);
