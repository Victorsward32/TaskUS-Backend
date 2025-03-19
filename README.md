# Task-US Backend

## API Documentation: Authentication & Activity Management

### Base URL
```
http://localhost:3000/api
```

---

## Authentication Routes

### 1. Register a New User
**Endpoint:**
```
POST /api/auth/register
```
**Description:** Registers a new user.

**Request Body:**
```json
{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
**Response:**
```json
{
    "message": "User registered successfully",
    "user": { "id": "12345", "username": "johndoe" }
}
```

### 2. User Login
**Endpoint:**
```
POST /api/auth/login
```
**Description:** Logs in a user and provides a token.

**Request Body:**
```json
{
    "email": "johndoe@example.com",
    "password": "securepassword"
}
```
**Response:**
```json
{
    "token": "jwt_token_here"
}
```

### 3. Forgot Password
**Endpoint:**
```
POST /api/auth/forgot-password
```
**Description:** Sends a password reset link.

**Request Body:**
```json
{
    "email": "johndoe@example.com"
}
```
**Response:**
```json
{
    "message": "Password reset link sent to email"
}
```

### 4. Reset Password
**Endpoint:**
```
POST /api/auth/reset-password
```
**Description:** Resets the user's password.

**Request Body:**
```json
{
    "token": "reset_token_here",
    "newPassword": "newsecurepassword"
}
```
**Response:**
```json
{
    "message": "Password reset successfully"
}
```

### 5. Upload Profile Photo
**Endpoint:**
```
POST /api/auth/upload-photo
```
**Description:** Uploads a new profile photo.

**Request Body (Form-data with file upload):**
```json
{
    "profilePhoto": "image_file"
}
```
**Response:**
```json
{
    "message": "Profile photo updated successfully"
}
```

---

## Activity Management Routes

### 1. Create a Task
**Endpoint:**
```
POST /api/activity/create-task
```
**Description:** Creates a new task.

**Request Body:**
```json
{
    "title": "Task Title",
    "description": "Task Description"
}
```
**Response:**
```json
{
    "message": "Task created successfully",
    "task": { "id": "123", "title": "Task Title" }
}
```

### 2. Get Tasks
**Endpoint:**
```
GET /api/activity/get-task
```
**Description:** Retrieves all tasks.

**Response:**
```json
[
    { "id": "123", "title": "Task 1" },
    { "id": "124", "title": "Task 2" }
]
```

### 3. Edit a Task
**Endpoint:**
```
PUT /api/activity/edit-task/:taskId
```
**Description:** Edits an existing task.

**Request Body:**
```json
{
    "title": "Updated Task Title",
    "description": "Updated Description"
}
```
**Response:**
```json
{
    "message": "Task updated successfully"
}
```

### 4. Delete a Task
**Endpoint:**
```
DELETE /api/activity/delete-task/:taskId
```
**Description:** Deletes a task by ID.

**Response:**
```json
{
    "message": "Task deleted successfully"
}
```

---

## Notes Management

### 1. Create a Note
**Endpoint:**
```
POST /api/activity/create-note
```
**Description:** Creates a new note.

**Request Body:**
```json
{
    "title": "Note Title",
    "content": "Note Content"
}
```
**Response:**
```json
{
    "message": "Note created successfully",
    "note": { "id": "567", "title": "Note Title" }
}
```

### 2. Get Notes
**Endpoint:**
```
GET /api/activity/get-note
```
**Description:** Retrieves all notes.

**Response:**
```json
[
    { "id": "567", "title": "Note 1" },
    { "id": "568", "title": "Note 2" }
]
```

### 3. Edit a Note
**Endpoint:**
```
PUT /api/activity/edit-note/:noteId
```
**Description:** Edits an existing note.

**Request Body:**
```json
{
    "title": "Updated Note Title",
    "content": "Updated Content"
}
```
**Response:**
```json
{
    "message": "Note updated successfully"
}
```

### 4. Delete a Note
**Endpoint:**
```
DELETE /api/activity/delete-note/:noteId
```
**Description:** Deletes a note by ID.

**Response:**
```json
{
    "message": "Note deleted successfully"
}
```

---

## Todo Management

### 1. Create a Todo
**Endpoint:**
```
POST /api/activity/create-todo
```
**Description:** Creates a new todo item.

**Request Body:**
```json
{
    "task": "Todo Task"
}
```
**Response:**
```json
{
    "message": "Todo created successfully",
    "todo": { "id": "789", "task": "Todo Task" }
}
```

### 2. Get Todos
**Endpoint:**
```
GET /api/activity/get-todo
```
**Description:** Retrieves all todo items.

**Response:**
```json
[
    { "id": "789", "task": "Todo 1" },
    { "id": "790", "task": "Todo 2" }
]
```

### 3. Edit a Todo
**Endpoint:**
```
PUT /api/activity/edit-todo/:todoId
```
**Description:** Edits an existing todo.

**Request Body:**
```json
{
    "task": "Updated Todo Task"
}
```
**Response:**
```json
{
    "message": "Todo updated successfully"
}
```

### 4. Delete a Todo
**Endpoint:**
```
DELETE /api/activity/delete-todo/:todoId
```
**Description:** Deletes a todo item by ID.

**Response:**
```json
{
    "message": "Todo deleted successfully"
}
```

---

## Conclusion
This API allows users to manage authentication, tasks, notes, and todos. Ensure authentication using the provided JWT token in protected routes.

