const API_URL = "http://localhost:8000/api/members";
const PROJECT_API = "http://localhost:8000/api/projects";

// Load Projects
async function loadProjects() {

    try {

        const response = await fetch(PROJECT_API, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const projects = await response.json();

        const select = document.getElementById("projectSelect");

        select.innerHTML = "";

        projects.forEach(project => {

            select.innerHTML += `
                <option value="${project._id}">
                    ${project.name}
                </option>
            `;

        });

        // Load members for first selected project
        loadMembers();

    } catch (error) {

        console.log(error);

    }

}

// Load Members
async function loadMembers() {

    try {

        const projectId =
        document.getElementById("projectSelect").value;

        if (!projectId) return;

        const response =
        await fetch(`${API_URL}?projectId=${projectId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const users = await response.json();

        const container =
        document.getElementById("membersContainer");

        container.innerHTML = "";

        users.forEach(user => {

            container.innerHTML += `

            <div class="task-card">

                <h3>${user.name}</h3>

                <p>${user.email}</p>

                ${
                    user.added ?

                    `<button
                        disabled
                        style="background:green;color:white;cursor:not-allowed;">

                        ✅ Already Added

                    </button>`

                    :

                    `<button
                        onclick="addMember('${user._id}')">

                        ➕ Add To Project

                    </button>`
                }

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// Add Member
async function addMember(userId) {

    const projectId =
    document.getElementById("projectSelect").value;

    if (!projectId) {

        alert("Please select a project");

        return;

    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`

            },

            body: JSON.stringify({

                projectId,
                userId

            })

        });

        const data = await response.json();

        alert(data.message);

        loadMembers();

    } catch (error) {

        console.log(error);

    }

}

// Reload members when project changes
document.getElementById("projectSelect")
.addEventListener("change", loadMembers);

// Initial Load
loadProjects();