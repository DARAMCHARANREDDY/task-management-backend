var mongoose = require('mongoose');
var Schema = mongoose.Schema;

taskSchema = new Schema({
    title: String,
    description: String,
    urgency: String,
    status: String,
    user_id: Schema.ObjectId,
    isCollapsed: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, {
    collection: 'Tasks'
}),
task = mongoose.model('task', taskSchema);

module.exports = task;