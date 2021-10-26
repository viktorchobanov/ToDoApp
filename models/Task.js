const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskID: { type: String, lowercase: true, required: false },
    title: { type: String, lowercase: true, required: true },
}, { collection: 'tasks' });

module.exports = mongoose.model('Task', TaskSchema);;