import express from "express";
import {
    createNotes, createTask, createTodo, deleteNotes,
    deleteTask, deleteTodo, editNotes, editTask, editTodo,
    getNotes, getTask, getTodo
} from "../../../controllers/activityController.js";
import { activityUploads } from "../../../config/upload.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";

const taskRouter = express.Router();

//----------------- Tasks ---------------------//
taskRouter.post('/create-Task', authMiddleware, activityUploads.single("image"), createTask)
taskRouter.get('/get-Task', authMiddleware, getTask)
taskRouter.put('/edit-task/:taskId', authMiddleware, activityUploads.single("image"), editTask)
taskRouter.delete('/delete-task/:taskId', authMiddleware, deleteTask)
//--------------  Notes --------------------//
taskRouter.post('/create-note', authMiddleware, activityUploads.single("image"), createNotes)
taskRouter.get('/get-note', authMiddleware, getNotes)
taskRouter.put('/edit-note/:noteId', authMiddleware, activityUploads.single("image"), editNotes)
taskRouter.delete('/delete-note/:noteId', authMiddleware, deleteNotes)
//-------------- Todo -------------------------//
taskRouter.post('/create-todo', authMiddleware, activityUploads.single("image"), createTodo)
taskRouter.get('/get-todo', authMiddleware, getTodo)
taskRouter.put('/edit-todo/:todoId', authMiddleware, activityUploads.single("image"), editTodo)
taskRouter.delete('/delete-todo/:todoId', authMiddleware, deleteTodo)
export default taskRouter;