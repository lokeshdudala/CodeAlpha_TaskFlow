const API_URL = "http://localhost:8000/api/tasks";
const MEMBER_API = "http://localhost:8000/api/members";

// Check Login
if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
}

// Get Project ID
const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");
console.log("Project ID:", projectId);
async function loadMembers() {

    try {

        const response = await fetch(
            `${MEMBER_API}?projectId=${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const members = await response.json();

        const select =
        document.getElementById("assignedTo");

        select.innerHTML =
        `<option value="">Select Member</option>`;

        members.forEach(member => {

            if(member.added){

                select.innerHTML += `
                    <option value="${member._id}">
                        ${member.name}
                    </option>
                `;

            }

        });

    }

    catch(error){

        console.log(error);

    }

}

// Show / Hide Task Form
function showTaskForm() {

    const form = document.getElementById("taskForm");

    if (form.style.display === "none") {

        form.style.display = "block";

    } else {

        form.style.display = "none";

    }

}
async function createTask(){

    const taskId =
    document.getElementById("taskId").value;

    const title =
    document.getElementById("taskTitle").value;

    const description =
    document.getElementById("taskDescription").value;

    const priority =
    document.getElementById("taskPriority").value;
    const assignedTo =
document.getElementById("assignedTo").value;

    const dueDate =
    document.getElementById("taskDueDate").value;
    console.log("Assigned To:", assignedTo);

    const taskData = {

        title,
        description,
        priority,
         assignedTo,
        dueDate,
        project: projectId

    };

    try{

        let response;

        if(taskId){

            response = await fetch(

                `${API_URL}/${taskId}`,

                {

                    method:"PUT",

                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },

                    body:JSON.stringify(taskData)

                }

            );

        }

        else{

            response = await fetch(

                API_URL,

                {

                    method:"POST",

                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },

                    body:JSON.stringify(taskData)

                }

            );

        }

        const data =
        await response.json();

        alert(data.message);

        clearForm();

        loadTasks();

    }

    catch(error){

        console.log(error);

    }

}
async function loadTasks() {

    try {

        const response =
        await fetch(`${API_URL}/${projectId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const tasks =
        await response.json();

        document.getElementById("todo").innerHTML = "";
        document.getElementById("progress").innerHTML = "";
        document.getElementById("done").innerHTML = "";

        tasks.forEach(task => {

            const card = `

            <div class="task-card">

                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>
                <p>
    <strong>Assigned To:</strong>

    ${
        task.assignedTo
        ? task.assignedTo.name
        : "Not Assigned"
    }

</p>
<p>
    <strong>Due:</strong>
    ${task.dueDate
        ? new Date(task.dueDate).toLocaleDateString()
        : "N/A"}
</p>

<select
    onchange="updateStatus('${task._id}', this.value)">

    <option value="To Do"
        ${task.status === "To Do" ? "selected" : ""}>
        To Do
    </option>

    <option value="In Progress"
        ${task.status === "In Progress" ? "selected" : ""}>
        In Progress
    </option>

    <option value="Done"
        ${task.status === "Done" ? "selected" : ""}>
        Done
    </option>

</select>

<div class="task-buttons">

    <button
    onclick='editTask(${JSON.stringify(task)})'>

        ✏ Edit

    </button>
    <button
onclick="openComments('${task._id}')">

💬 Comments

</button>

    <button
    onclick="deleteTask('${task._id}')">

        🗑 Delete

    </button>

</div>
            </div>

            `;

            if(task.status === "To Do"){

                document.getElementById("todo").innerHTML += card;

            }

            else if(task.status === "In Progress"){

                document.getElementById("progress").innerHTML += card;

            }

            else{

                document.getElementById("done").innerHTML += card;

            }

        });

    } catch(error){

        console.log(error);

    }

}
async function deleteTask(id){

    if(!confirm("Delete this task?")){

        return;

    }

    await fetch(

        `${API_URL}/${id}`,

        {

            method:"DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }

        }

    );

    loadTasks();

}
async function updateStatus(id, status) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },

            body: JSON.stringify({
                status
            })

        });

        loadTasks();

    } catch (error) {

        console.log(error);

    }

}
function editTask(task){

    document.getElementById("taskId").value =
    task._id;

    document.getElementById("taskTitle").value =
    task.title;

    document.getElementById("taskDescription").value =
    task.description;

    document.getElementById("taskPriority").value =
    task.priority;

    if(task.dueDate){

        document.getElementById("taskDueDate").value =
        task.dueDate.substring(0,10);

    }

    document.getElementById("taskForm").style.display =
    "block";

}
function clearForm(){

    document.getElementById("taskId").value = "";

    document.getElementById("taskTitle").value = "";

    document.getElementById("taskDescription").value = "";

    document.getElementById("taskPriority").value = "Medium";

    document.getElementById("taskDueDate").value = "";

}
function openComments(id){

    window.location.href =
    `task-details.html?id=${id}`;

}
loadMembers();
loadTasks();