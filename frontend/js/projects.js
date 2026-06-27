const API_URL =
"http://localhost:8000/api/projects";

// Check Login
if (!localStorage.getItem("token")) {

    window.location.href = "login.html";

}

const userId =
localStorage.getItem("userId");

// Load Projects
async function loadProjects(){

    try{

        const response =
        await fetch(API_URL);

        const projects =
        await response.json();

        const container =
        document.getElementById(
            "projectsContainer"
        );

        container.innerHTML = "";

        projects.forEach(project=>{

            container.innerHTML += `

            <div class="project-card">

                <h3>${project.name}</h3>

                <p>
                    ${project.description}
                </p>

                <small>

                    👤
                    ${project.owner.name}

                </small>

                <br><br>

                <button
                onclick="openProject('${project._id}')">

                    Open

                </button>

                <button
                onclick="deleteProject('${project._id}')">

                    Delete

                </button>

            </div>

            `;

        });

    }catch(error){

        console.log(error);

    }

}

// Create Project
async function createProject(){

    const name =
    document.getElementById(
        "projectName"
    ).value;

    const description =
    document.getElementById(
        "projectDescription"
    ).value;

    if(!name || !description){

        alert("Fill all fields");

        return;

    }

    try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                name,
                description,
                owner:userId

            })

        });

        const data =
        await response.json();

        alert(data.message);

        document.getElementById(
            "projectName"
        ).value="";

        document.getElementById(
            "projectDescription"
        ).value="";

        loadProjects();

    }catch(error){

        console.log(error);

    }

}

// Delete Project
async function deleteProject(id){

    if(!confirm(
        "Delete this Project?"
    )) return;

    await fetch(

        `${API_URL}/${id}`,

        {

            method:"DELETE"

        }

    );

    loadProjects();

}

// Open Project
function openProject(id){

    window.location.href=
    `project-board.html?id=${id}`;

}

loadProjects();