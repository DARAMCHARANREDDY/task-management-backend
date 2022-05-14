import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.js';
import auth from '../Middlewares/auth.js';
const router = express.Router();

// Get all posts data
router.get('/', getTasks)

// Submit one post to database
router.post('/', auth, createTask);

// Update one Post
router.patch('/:id', auth, updateTask);

// Delete one Post
router.delete('/:id', auth, deleteTask);

export default router