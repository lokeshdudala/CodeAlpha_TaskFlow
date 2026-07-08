# TaskFlow - Project Management Application

TaskFlow is a comprehensive project management and collaboration platform built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- **User Authentication**: Secure login and registration system
- **Project Management**: Create and manage multiple projects
- **Task Management**: Organize tasks with status tracking (To Do, In Progress, Done)
- **Team Collaboration**: Add team members and manage project access
- **Task Board**: Kanban-style board for task management
- **Comments**: Add comments to tasks for team discussion
- **Calendar View**: Visualize task deadlines
- **User Profile**: Manage user information and password

## Project Structure

```
TaskFlow/
├── frontend/                 # Frontend files (HTML, CSS, JS)
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # Main dashboard
│   ├── projects.html        # Projects list
│   ├── project-board.html   # Kanban board
│   ├── task-details.html    # Task details page
│   ├── create-project.html  # Create project form
│   ├── members.html         # Team members page
│   ├── calendar.html        # Calendar view
│   ├── mytasks.html         # User's tasks
│   ├── profile.html         # User profile
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   ├── js/
│   │   ├── auth.js          # Authentication functions
│   │   ├── dashboard.js     # Dashboard functions
│   │   ├── projects.js      # Projects functions
│   │   ├── board.js         # Kanban board functions
│   │   ├── task.js          # Task management functions
│   │   ├── comments.js      # Comments functions
│   │   ├── members.js       # Members management functions
│   │   ├── calendar.js      # Calendar functions
│   │   ├── profile.js       # Profile functions
│   │   └── logout.js        # Logout functions
│   └── images/
│       ├── logo.png         # Application logo
│       ├── login.svg        # Login illustration
│       └── dashboard.svg    # Dashboard illustration
│
├── backend/                  # Backend files (Node.js/Express)
│   ├── config/
│   │   └── db.js            # MongoDB configuration
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Project.js       # Project model
│   │   ├── Task.js          # Task model
│   │   └── Comment.js       # Comment model
│   ├── controllers/
│   │   ├── authController.js       # Authentication controller
│   │   ├── projectController.js    # Projects controller
│   │   ├── taskController.js       # Tasks controller
│   │   ├── commentController.js    # Comments controller
│   │   └── memberController.js     # Members controller
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── projectRoutes.js        # Projects routes
│   │   ├── taskRoutes.js           # Tasks routes
│   │   ├── commentRoutes.js        # Comments routes
│   │   └── memberRoutes.js         # Members routes
│   ├── server.js            # Express server setup
│   ├── package.json         # Node.js dependencies
│   └── .env                 # Environment variables
│
└── README.md                # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and configure your MongoDB connection:
```bash
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your-secret-key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open the frontend folder in a local server (using VS Code Live Server or similar)
2. Navigate to `http://localhost:5500` (or your local server port)
3. Start by accessing `index.html`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/profile/change-password` - Change password

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member to project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/my` - Get user's tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/project/:projectId` - Get project's tasks

### Comments
- `POST /api/comments/:taskId/comments` - Create comment
- `GET /api/comments/:taskId/comments` - Get task comments
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

### Members
- `GET /api/members` - Get all users
- `GET /api/members/project/:projectId` - Get project members
- `POST /api/members/:projectId` - Add member to project
- `DELETE /api/members/:projectId/:memberId` - Remove member from project

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Calendar
- `GET /api/calendar/events` - Get calendar events

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Log in with your credentials
3. **Dashboard**: View project statistics and recent activities
4. **Create Project**: Click "Create Project" to start a new project
5. **Manage Tasks**: Add, update, and track tasks on the project board
6. **Collaborate**: Add team members and manage permissions
7. **Communicate**: Leave comments on tasks for team discussion

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Local Storage API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with authentication middleware
- CORS enabled for secure API access

## Future Enhancements

- Real-time notifications
- File attachments for tasks
- Email notifications
- Advanced analytics and reporting
- Mobile app
- Dark mode
- Internationalization (i18n)
- Two-factor authentication

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the ISC License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.


---
# TaskFlow - Project Management System

## 🚀 Live Demo
Frontend: https://taskflow-frontend-d1v7.onrender.com

Backend API: https://taskflow-backend-7c2p.onrender.com

## 📂 GitHub Repository
https://github.com/lokeshdudala/CodeAlpha_TaskFlow
**Version**: 1.0.0
**Last Updated**: 2024
