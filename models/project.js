const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema ({
	projectName: { type: String },
	projectDescription: { type: String },
	createdBy: { type: String },
	dateCreated: { type: Date, default: Date.now },
	deadline: { type: Date }
})

module.exports = mongoose.model("project", projectSchema);
