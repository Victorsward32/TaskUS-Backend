import Note from "../models/usersTasks/noteModel.js";
import Task from "../models/usersTasks/taskModel.js";
import fs from 'fs'
import Todo from "../models/usersTasks/todoModel.js";

//---------------- Tasks ------------------------------------//
export const createTask= async(req,res)=>{
    try {
        const {title,description}=req.body;
        const userId=req.user.id;
        if(!title){
            return res.status(400).json({message:'Title is required'})

        }
        const newTask=new Task({
            userId,
            title,
            description,
            image:req.file? req.file.path:null
        })

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}
export const getTask=async (req,res) =>{
    try {
        const userId = req.user.id; // Get logged-in user ID
        const tasks = await Task.find({userId});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }

}

export const editTask=async (req,res)=>{
    try {
        const { taskId } = req.params;
        const { title, description,image } = req.body;
        const userId = req.user.id; // Get logged-in user ID

        //find the task
        let task = await Task.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        console.log("Found task:", task);
          // 🟢 Delete Old Image If a New One is Uploaded
          if (req.file && task.image) {
            try {
                fs.unlinkSync(task.image);
                console.log("Old image deleted");
            } catch (err) {
                console.error("Error deleting old image:", err);
                // Continue despite error
            }
        }

         // 🟢 Update Task Data
         task.title = title !== undefined ? title : task.title;
         task.description = description !== undefined ? description : task.description;
         if (req.file) {
             task.image = req.file.path;
         }
 
         const updatedTask = await task.save();
         res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error: error.message });
    }
}

export const deleteTask= async (req, res)=>{
    try {
        const { taskId } = req.params;
        const userId = req.user.id; // Get logged-in user ID

        const task = await Task.findOne({ _id: taskId, userId }); // Ensure task belongs to user
        if (!task) return res.status(404).json({ message: "Task not found" });

        // 🟢 Delete Task Image from Server
        if (task.image) {
            fs.unlink(task.image, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        // 🟢 Delete Task from Database
        await Task.deleteOne({ _id: taskId });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error: error.message });
    }

}


//---------------- Notes ------------------------------------//

export const createNotes= async (req,res)=>{
    try {
        const {title,points}=req.body;
        const userId = req.user.id; // Get logged-in user ID from middleware
        
        if(!title){
            return res.status(400).json({
                message:"Title is required"
            })
        }

        const newNote= new Note({
            userId,
            title,
            image:req.file?req.file.path : null,
            points:JSON.parse(points)
        })

      await newNote.save()
      res.status(201).json({message:"Note Created successfully.",note:newNote})
        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}

export const editNotes= async (req,res)=>{
    try {
        const { noteId } = req.params;
        const { title, points } = req.body;
        const userId = req.user.id;

        let note = await Note.findOne({ _id: noteId, userId }); // Find user's note
        console.log(note);
        
        if (!note) return res.status(404).json({ message: "Note not found" });

        // 🟢 Delete Old Image If a New One is Uploaded
       
        if (req.file && note.image) {
            try {
                fs.unlinkSync(note.image);
                console.log("Old image deleted");
            } catch (err) {
                console.error("Error deleting old image:", err);
                // Continue despite error
            }
        }

        // 🟢 Update Note Data
       
        note.title = title !== undefined ? title :  note.title;
        note.points = points !== undefined ? JSON.parse(points) :  note.points;
        if (req.file) {
            note.image = req.file.path;
        }

        const updatedNote = await note.save();
        res.status(200).json({ message: "Note updated successfully", updatedNote });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
}
export const deleteNotes= async (req,res)=>{
    try {
        const { noteId } = req.params;
        const userId = req.user.id;

        const note = await Note.findOne({ _id: noteId, userId }); // Ensure note belongs to user
        if (!note) return res.status(404).json({ message: "Note not found" });

        // 🟢 Delete Note Image from Server
        if (note.image) {
            fs.unlink(note.image, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        // 🟢 Delete Note from Database
        await Note.deleteOne({ _id: noteId });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }

}
export const getNotes= async (req,res)=>{
    try {
        const userId = req.user.id; // Get logged-in user ID

        const notes = await Note.find({ userId }); // Fetch only tasks for this user
        res.status(200).json(notes);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }

}

//-------------- Todo ------------------------------------//
export const createTodo= async (req,res)=>{
    try {
        const {title,points}=req.body;
        const userId = req.user.id; // Get logged-in user ID from middleware
        
        if(!title){
            return res.status(400).json({
                message:"Title is required"
            })
        }

        const newTodo= new Todo({
            userId,
            title,
            image:req.file?req.file.path : null,
            points:JSON.parse(points)
        })

      await newTodo.save()
      res.status(201).json({message:"Todo Created successfully.",note:newTodo})
        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const editTodo= async (req,res)=>{
    try {
        const { todoId } = req.params;
        const { title, points } = req.body;
        const userId = req.user.id;

        let todo = await Todo.findOne({ _id: todoId, userId }); // Find user's note
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        // 🟢 Delete Old Image If a New One is Uploaded
       
        if (req.file && todo.image) {
            try {
                fs.unlinkSync(todo.image);
                console.log("Old image deleted");
            } catch (err) {
                console.error("Error deleting old image:", err);
                // Continue despite error
            }
        }
        // 🟢 Update Note Data
        todo.title = title !== undefined ? title : todo.title;
        todo.points = points !== undefined ? JSON.parse(points) : todo.points;
        if (req.file) {
            todo.image = req.file.path;
        }

        const updatedTodo = await todo.save();
        res.status(200).json({ message: "Todo updated successfully", updatedTodo });

    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
}
export const deleteTodo= async (req,res)=>{
    try {
        const { todoId } = req.params;
        const userId = req.user.id;

        const todo = await Todo.findOne({ _id: todoId, userId }); // Ensure note belongs to user
        if (!todo) return res.status(404).json({ message: "todo not found" });

        // 🟢 Delete Note Image from Server
        if (todo.image) {
            fs.unlink(todo.image, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        // 🟢 Delete Note from Database
        await Todo.deleteOne({ _id: todoId });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}

export const getTodo=async (req,res)=>{
    try {
        const userId = req.user.id; // Get logged-in user ID

        const todo = await Todo.find({ userId }); // Fetch only tasks for this user
        res.status(200).json(todo);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }

}