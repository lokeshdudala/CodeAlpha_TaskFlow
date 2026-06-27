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

        const response = await fetch(API_URL);

        const data = await response.json();

        document.getElementById("totalProjects").innerText =
        data.totalProjects;

        document.getElementById("totalTasks").innerText =
        data.totalTasks;

        document.getElementById("completedTasks").innerText =
        data.completedTasks;

        document.getElementById("pendingTasks").innerText =
        data.pendingTasks;

    } catch (error) {

        console.log(error);

    }

}

// Load Dashboard
loadDashboard();