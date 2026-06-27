// Task functions
const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Check if we're on task-details or mytasks page
    if (document.getElementById('taskTitle')) {
        loadTaskDetails();
    } else if (document.getElementById('tasksList')) {
        loadMyTasks();
    }

    const statusFilter = document.getElementById('statusFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', loadMyTasks);
    }
    if (priorityFilter) {
        priorityFilter.addEventListener('change', loadMyTasks);
    }
});

async function loadTaskDetails() {
    try {
        const taskId = new URLSearchParams(window.location.search).get('id');
        
        if (!taskId) {
            alert('Task ID is required');
            window.location.href = 'mytasks.html';
            return;
        }

        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const task = await response.json();
            
            document.getElementById('taskTitle').textContent = task.title;
            document.getElementById('taskDescription').textContent = task.description;
            document.getElementById('taskStatus').textContent = task.status;
            document.getElementById('taskPriority').textContent = task.priority;
            document.getElementById('taskAssignee').textContent = task.assignee || 'Unassigned';
            document.getElementById('taskDueDate').textContent = new Date(task.dueDate).toLocaleDateString();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadMyTasks() {
    try {
        const status = document.getElementById('statusFilter')?.value || '';
        const priority = document.getElementById('priorityFilter')?.value || '';

        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        if (priority) queryParams.append('priority', priority);

        const response = await fetch(`${API_URL}/tasks/my?${queryParams}`, {
            headers: getAuthHeader()
        });

        if (response.ok) {
            const tasks = await response.json();
            const tasksList = document.getElementById('tasksList');
            
            if (tasks.length === 0) {
                tasksList.innerHTML = '<p>No tasks found</p>';
            } else {
                tasksList.innerHTML = tasks.map(task => `
                    <div class="task-card">
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>
                        <p>Status: ${task.status}</p>
                        <p>Priority: ${task.priority}</p>
                        <p>Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
                        <a href="task-details.html?id=${task.id}" class="btn btn-primary">View Details</a>
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateTask(taskId, updates) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: getAuthHeader(),
            body: JSON.stringify(updates)
        });

        if (response.ok) {
            alert('Task updated successfully');
            loadTaskDetails();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update task');
    }
}

async function deleteTask(taskId) {
    if (!confirm('Are you sure?')) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });

        if (response.ok) {
            window.location.href = 'mytasks.html';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
