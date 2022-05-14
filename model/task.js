import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    urgency: String,
    status: String,
    creator: {
        type: String,
        required: true,
        min: 6
    },
    isCollapsed: { type: Boolean, default: false },
    is_delete: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, {
    collection: 'Tasks'
})


export default mongoose.model('task', taskSchema);