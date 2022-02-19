const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
	email: { type: String, required: true, min: 6, max: 255 },
	password: { type: String, required: true, min: 6, max: 255 },
	name: { type: String, required: true, min: 2, max: 255 }
})

module.exports = mongoose.model("user", userSchema);
