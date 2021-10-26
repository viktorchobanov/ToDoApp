const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = require('./Task').schema;

const ListSchema = new Schema({
    listName: { type: String, lowercase: true, required: true },
    elements: { type: [TaskSchema], lowercase: true, required: false},
}, { collection: 'lists' });

module.exports = mongoose.model('List', ListSchema);