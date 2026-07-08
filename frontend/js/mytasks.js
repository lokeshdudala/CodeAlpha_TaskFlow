const API_URL = "https://taskflow-backend-7c2p.onrender.com/api/tasks";

// Check Login
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

const userId = localStorage.getItem("userId");

async function loadMyTasks() {

    try {

        const response = await fetch(`${API_URL}/my/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const tasks = await response.json();

        const container = document.getElementById("myTasks");

        container.innerHTML = "";

        if(tasks.length === 0){

            container.innerHTML = "<h2>No Tasks Assigned</h2>";

            return;

        }

        tasks.forEach(task=>{

            container.innerHTML += `

            <div class="task-card">

                <h2>${task.title}</h2>

                <p>

                    <strong>Project :</strong>

                    ${task.project.name}

                </p>

                <p>

                    <strong>Status :</strong>

                    ${task.status}

                </p>

                <p>

                    <strong>Priority :</strong>

                    ${task.priority}

                </p>

                <p>

                    <strong>Due :</strong>

                    ${
                        task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"
                    }

                </p>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadMyTasks();