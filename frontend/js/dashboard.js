const API_URL = "http://localhost:8000/api/dashboard";

// Check Login
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// Show User Name
document.getElementById("userName").innerText =
localStorage.getItem("userName");

// Load Dashboard Statistics
async function loadDashboard() {

    try {

        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = await response.json();

        document.getElementById("totalProjects").innerText =
        data.totalProjects;

        document.getElementById("totalTasks").innerText =
        data.totalTasks;

        document.getElementById("completedTasks").innerText =
        data.completedTasks;

        document.getElementById("pendingTasks").innerText =
        data.pendingTasks;

        renderOrphanWarning(data.orphanTasks || 0);
        renderRecentProjects(data.recentProjects || []);
        renderUpcomingTasks(data.upcomingTasks || []);

    } catch (error) {

        console.log(error);

    }

}

function renderOrphanWarning(count) {
    const warning = document.getElementById('orphanWarning');
    if (count > 0) {
        warning.innerHTML = `
            <div class="card" style="background: #ffe8e8; color: #a12727; border: 1px solid #f5c2c2; margin-bottom: 1.5rem;">
                <h3>Orphan Tasks Detected</h3>
                <p>${count} task${count === 1 ? '' : 's'} are assigned to missing projects and are excluded from dashboard totals.</p>
            </div>
        `;
    } else {
        warning.innerHTML = '';
    }
}

function renderRecentProjects(projects) {
    const container = document.getElementById("recentProjects");

    if (!projects.length) {
        container.innerHTML = '<p>No recent projects yet.</p>';
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Owner:</strong> ${project.owner?.name || 'Unknown'}</p>
            <p><strong>Status:</strong> ${project.status}</p>
        </div>
    `).join('');
}

function renderUpcomingTasks(tasks) {
    const upcomingSection = document.createElement('section');
    upcomingSection.className = 'recent-section';
    upcomingSection.innerHTML = `
        <div class="section-header">
            <h2>Upcoming Tasks</h2>
        </div>
        <div class="project-grid" id="upcomingTasks"></div>
    `;

    document.querySelector('main.main-content').appendChild(upcomingSection);

    const container = document.getElementById('upcomingTasks');

    if (!tasks.length) {
        container.innerHTML = '<p>No upcoming tasks.</p>';
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="project-card">
            <h3>${task.title}</h3>
            <p>${task.description || 'No description'}</p>
            <p><strong>Project:</strong> ${task.project?.name || 'Unassigned'}</p>
            <p><strong>Due:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${task.status}</p>
        </div>
    `).join('');
}

// Load Dashboard
loadDashboard();