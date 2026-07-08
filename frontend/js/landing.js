// TaskFlow Landing Page Interactive Script
document.addEventListener("DOMContentLoaded", () => {
    // 1. Navbar scroll effect
    const nav = document.querySelector(".landing-nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // 2. Scroll Reveal Animations
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealOnScroll.observe(el));

    // 3. Interactive Kanban Board Demo
    let demoTasks = [
        { id: 1, title: "Design Landing Page UI", description: "Create high-fidelity landing page mockup with interactive elements.", status: "todo", priority: "high", category: "Design" },
        { id: 2, title: "Integrate JWT Auth", description: "Implement secure authentication tokens for user sessions.", status: "inprogress", priority: "medium", category: "Backend" },
        { id: 3, title: "Database Architecture", description: "Define schemas for Users, Projects, and Tasks models.", status: "done", priority: "low", category: "Database" }
    ];

    let tasksCompleted = 1;
    const completedCounter = document.getElementById("demo-completed-count");
    const todoList = document.getElementById("demo-todo-list");
    const inprogressList = document.getElementById("demo-inprogress-list");
    const doneList = document.getElementById("demo-done-list");

    function updateDemoBoard() {
        // Clear columns
        todoList.innerHTML = "";
        inprogressList.innerHTML = "";
        doneList.innerHTML = "";

        // Reset counts
        let todoCount = 0;
        let inprogressCount = 0;
        let doneCount = 0;

        demoTasks.forEach(task => {
            const card = document.createElement("div");
            card.className = "demo-task-card";
            card.innerHTML = `
                <div class="demo-task-tags">
                    <span class="demo-tag ${task.priority}">${task.priority}</span>
                    <span style="font-size: 0.7rem; color: #a5b4fc;">${task.category}</span>
                </div>
                <h5>${task.title}</h5>
                <p>${task.description}</p>
                <div class="demo-task-footer">
                    <span>👤 Demo User</span>
                    ${task.status !== 'done' ? `<button class="demo-task-btn" data-id="${task.id}">Move Status ➔</button>` : '<span>✅ Completed</span>'}
                </div>
            `;

            // Append to appropriate list
            if (task.status === "todo") {
                todoList.appendChild(card);
                todoCount++;
            } else if (task.status === "inprogress") {
                inprogressList.appendChild(card);
                inprogressCount++;
            } else if (task.status === "done") {
                doneList.appendChild(card);
                doneCount++;
            }
        });

        // Update column headers
        document.getElementById("todo-count").textContent = todoCount;
        document.getElementById("inprogress-count").textContent = inprogressCount;
        document.getElementById("done-count").textContent = doneCount;

        // Add event listeners to buttons
        document.querySelectorAll(".demo-task-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                moveTask(id);
            });
        });
    }

    function moveTask(id) {
        const taskIndex = demoTasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            const task = demoTasks[taskIndex];
            
            // Cycle status
            if (task.status === "todo") {
                task.status = "inprogress";
            } else if (task.status === "inprogress") {
                task.status = "done";
                tasksCompleted++;
                animateCompletedCounter();
            }
            
            updateDemoBoard();
        }
    }

    function animateCompletedCounter() {
        if (completedCounter) {
            completedCounter.textContent = tasksCompleted;
            completedCounter.style.transform = "scale(1.3)";
            completedCounter.style.color = "#10b981";
            completedCounter.style.transition = "transform 0.2s ease, color 0.2s ease";
            setTimeout(() => {
                completedCounter.style.transform = "scale(1)";
                completedCounter.style.color = "";
            }, 300);
        }
    }

    // Initialize board
    updateDemoBoard();
});
