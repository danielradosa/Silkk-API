const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let projectSchema = new Schema ({
	title: { type: String, required: true, min: 3, max: 255 },
	favourite: { type: Boolean, required: false },
	description: { type: String, required: false, min: 10, max: 255 },
	deadline: { type: Date, required: true },
	author: { type: String, required: true },
	authorEmail: { type: String, required: true },
	associates: { type: Array, required: false },
	tasks: [{
		todo: [{
			taskTitle: { type: String, required: true, min: 3, max: 255 },
			status: { type: Boolean, required: true },
			items: [{
				singleItem: { type: String, required: true, min: 3, max: 255 }
			}]
		}],
		notes: [{
			noteTitle: { type: String, required: true, min: 3, max: 255 },
			content: { type: String, required: true }
		}]
	}]
})

module.exports = mongoose.model("project", projectSchema);
