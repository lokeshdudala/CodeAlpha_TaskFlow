const API_URL = "http://localhost:8000/api/comments";

if (!localStorage.getItem("token")) {

    window.location.href = "login.html";

}

const params = new URLSearchParams(window.location.search);

const taskId = params.get("id");

const userId = localStorage.getItem("userId");

// Load Comments
async function loadComments() {

    try {

        const response =
        await fetch(`${API_URL}/${taskId}`);

        const comments =
        await response.json();

        const container =
        document.getElementById("commentsContainer");

        container.innerHTML = "";

        comments.forEach(comment => {

            container.innerHTML += `

            <div class="task-card">

                <h3>${comment.user.name}</h3>

                <p>${comment.message}</p>

                <small>

                    ${new Date(
                        comment.createdAt
                    ).toLocaleString()}

                </small>

            </div>

            `;

        });

    } catch(error) {

        console.log(error);

    }

}

// Add Comment
async function addComment() {

    const message =
    document.getElementById("commentText").value;

    if(!message){

        alert("Enter a comment");

        return;

    }

    try {

        const response =
        await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                task:taskId,
                user:userId,
                message

            })

        });

        const data =
        await response.json();

        alert(data.message);

        document.getElementById(
            "commentText"
        ).value="";

        loadComments();

    } catch(error){

        console.log(error);

    }

}

loadComments();