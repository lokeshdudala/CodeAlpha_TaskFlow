const Project = require("../models/Project");
const Task = require("../models/Task");

const getDashboard = async (req, res) => {

    try {

        const totalProjects = await Project.countDocuments();

        const allTasks = await Task.find()
            .populate("project", "name")
            .lean();

        const validTasks = allTasks.filter(task => task.project && task.project._id);
        const orphanTasks = allTasks.length - validTasks.length;

        const totalTasks = validTasks.length;
        const completedTasks = validTasks.filter(task => task.status === "Done").length;
        const pendingTasks = validTasks.filter(task => task.status !== "Done").length;

        const recentProjects = await Project.find()
            .sort({ createdAt: -1 })
            .limit(4)
            .populate("owner", "name");

        const upcomingTasks = validTasks
            .filter(task => task.dueDate)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 4);

        res.json({

            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            orphanTasks,
            recentProjects,
            upcomingTasks

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    getDashboard

};