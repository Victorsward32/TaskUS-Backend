import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js"; // Correct import
import authRouter from "./routes/authentication/authRoutes.js";
import taskRouter from "./routes/activities/Task/taskRoutes.js";
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware to parse JSON
app.use(express.json());

//Routes
app.use("/api/auth",authRouter)
app.use("/api/activity",taskRouter)

// Simple Hello World Route
app.get("/", (req, res) => {
    res.send("Hello World! 🚀");
});

// Start Server
app.listen(PORT, () => {
    console.log(colors.yellow.bold(`Server running on http://localhost:${PORT}`));
});
