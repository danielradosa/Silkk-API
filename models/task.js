const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema ({
    taskTitle: { type: String, required: true, min: 3, max: 255 },
    status: { type: Boolean, required: true },
    list: { type: Schema.Types.ObjectId, ref: 'lists' }
})

module.exports = mongoose.model("task", taskSchema);