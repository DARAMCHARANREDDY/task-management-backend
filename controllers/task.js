import Task from "../model/task.js";
import mongoose from 'mongoose';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createTask = async (req, res) => {
    const task = new Task({ ...req.body, date: new Date().toISOString(), creator: req.userId });
    try {
        await task.save();
        res.status(201).json(task)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Update one task
export const updateTask = async (req, res) => {
    const { id: _id } = req.params;
    const task = req.body;
    if (!mongoose.isValidObjectId(_id)) return res.status(404).json({ message: "No task with that id!" })
    const upd_task = await Task.findByIdAndUpdate(_id, { ...task, _id: _id }, { new: true })
    res.status(201).json(upd_task)
}

// Delete one task
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndRemove(id)
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ message: "No task with that id!" })
    try {
        res.status(200).json({ message: `TaskT ${id} delted Successfully!` })
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export default { createTask, updateTask, deleteTask, getTasks }