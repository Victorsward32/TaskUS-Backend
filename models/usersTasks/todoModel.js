import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    title:{
        type:String,
        required:true
    },
    points: [
        { type: String }
    ],
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },

})

const Todo=mongoose.model("Todo",todoSchema);
export default Todo;